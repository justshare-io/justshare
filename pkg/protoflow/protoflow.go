package protoflow

import (
	"bufio"
	"context"
	"encoding/json"
	"github.com/breadchris/gosseract"
	connect_go "github.com/bufbuild/connect-go"
	whisper2 "github.com/ggerganov/whisper.cpp/bindings/go/pkg/whisper"
	"github.com/google/uuid"
	"github.com/google/wire"
	"github.com/kkdai/youtube/v2"
	genapi "github.com/lunabrain-ai/lunabrain/gen"
	"github.com/lunabrain-ai/lunabrain/gen/genconnect"
	"github.com/lunabrain-ai/lunabrain/pkg/whisper"
	"github.com/pkg/errors"
	"github.com/protoflow-labs/protoflow/gen"
	"github.com/protoflow-labs/protoflow/pkg/bucket"
	"github.com/protoflow-labs/protoflow/pkg/openai"
	"github.com/protoflow-labs/protoflow/pkg/protoflow"
	"github.com/reactivex/rxgo/v2"
	"github.com/rs/zerolog/log"
	ffmpeg "github.com/u2takey/ffmpeg-go"
	"image"
	"io"
	"os"
	"os/exec"
)

type Protoflow struct {
	openai openai.QAClient
}

var ProviderSet = wire.NewSet(
	New,
	NewProtoflow,
)

var _ genconnect.ProtoflowServiceHandler = (*Protoflow)(nil)

func NewProtoflow() (*protoflow.Protoflow, error) {
	// TODO breadchris pass a config provider in here
	return protoflow.Wire(bucket.Config{
		Name: ".lunabrain",
	}, &gen.Project{
		Id:   uuid.NewString(),
		Name: "test",
		Graph: &gen.Graph{
			Nodes: []*gen.Node{},
			Edges: []*gen.Edge{},
		},
	})
}

func New(openai openai.QAClient) *Protoflow {
	return &Protoflow{
		openai: openai,
	}
}

func (p *Protoflow) DownloadYouTubeVideo(ctx context.Context, c *connect_go.Request[genapi.YouTubeVideo]) (*connect_go.Response[genapi.FilePath], error) {
	client := youtube.Client{
		Debug: true,
	}

	video, err := client.GetVideo(c.Msg.Id)
	if err != nil {
		panic(err)
	}

	// only get videos with audio
	formats := video.Formats.WithAudioChannels()
	var stream io.ReadCloser
	var contentLength int64
	for _, format := range formats {
		stream, contentLength, err = client.GetStream(video, &format)
		if err != nil {
			panic(err)
		}

		if contentLength != 0 {
			break
		}
	}
	if contentLength == 0 {
		return nil, errors.New("no stream found")
	}

	// TODO breadchris this should be written to a file store, whose directory was provided by an env var? or a config file?
	file, err := os.Create("/tmp/video.mp4")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	log.Info().Str("id", c.Msg.Id).Msg("downloading video")
	_, err = io.Copy(file, stream)
	if err != nil {
		panic(err)
	}
	log.Info().Str("id", c.Msg.Id).Msg("downloaded video")
	return connect_go.NewResponse(&genapi.FilePath{}), nil
}

type Token struct {
	ID        uint32 `json:"id"`
	StartTime uint64 `json:"start_time"`
	EndTime   uint64 `json:"end_time"`
	Text      string `json:"text"`
}

type Segment struct {
	Num       uint32  `json:"num"`
	Tokens    []Token `json:"tokens"`
	Text      string  `json:"text"`
	StartTime uint64  `json:"start_time"`
	EndTime   uint64  `json:"end_time"`
}

// StreamObservable runs the binary "stream" and returns an Observable of its output lines.
func StreamObservable(ctx context.Context) rxgo.Observable {
	return rxgo.Create([]rxgo.Producer{func(ctx context.Context, next chan<- rxgo.Item) {
		cmd := exec.Command("third_party/whisper.cpp/stream")
		cmd.Args = append(
			cmd.Args,
			"-m", "third_party/whisper.cpp/models/ggml-base.en.bin",
			//"-t", "8",
			//"--step", "500",
			//"--length", "5000",
		)
		stdout, err := cmd.StdoutPipe()
		if err != nil {
			next <- rxgo.Error(err)
			return
		}
		stderr, err := cmd.StderrPipe()
		if err != nil {
			next <- rxgo.Error(err)
			return
		}

		stdoutScan := bufio.NewScanner(stdout)
		go func() {
			for stdoutScan.Scan() {
				var seg genapi.Segment
				if err := json.Unmarshal([]byte(stdoutScan.Text()), &seg); err != nil {
					next <- rxgo.Error(err)
					continue
				}
				next <- rxgo.Of(&seg)
			}
		}()

		stderrScan := bufio.NewScanner(stderr)
		go func() {
			for stderrScan.Scan() {
				// next <- rxgo.Of(stderrScan.Text())
				log.Debug().Str("stderr", stderrScan.Text()).Msg("stream")
			}
		}()

		err = cmd.Start()
		if err != nil {
			next <- rxgo.Error(err)
			return
		}

		go func() {
			<-ctx.Done()
			log.Info().Msg("killing stream")
			cmd.Process.Kill()
		}()

		err = cmd.Wait()
		if err != nil {
			next <- rxgo.Error(err)
			return
		}
	}}, rxgo.WithContext(ctx))
}

func (p *Protoflow) Chat(ctx context.Context, c *connect_go.Request[genapi.ChatRequest], c2 *connect_go.ServerStream[genapi.ChatResponse]) error {
	obs := StreamObservable(ctx)

	<-obs.ForEach(func(item any) {
		t, ok := item.(*genapi.Segment)
		if !ok {
			return
		}

		// TODO breadchris make sure that the previous segment is not too close to this one
		//log.Info().
		//	Int("diff", int(t.StartTime-prevSeg.StartTime)).
		//	Int("prev", int(prevSeg.StartTime)).
		//	Int("current", int(t.StartTime)).
		//	Msg("diff")
		//if prevSeg != nil && t.StartTime-prevSeg.StartTime < 500 {
		//	prevSeg = t
		//	return
		//}

		if err := c2.Send(&genapi.ChatResponse{
			Segment: t,
		}); err != nil {
			log.Error().Err(err).Msg("error sending token")
		}
	}, func(err error) {
		log.Error().Err(err).Msg("error in observable")
	}, func() {
	})
	return nil
}

func (p *Protoflow) ConvertFile(ctx context.Context, c *connect_go.Request[genapi.ConvertFileRequest]) (*connect_go.Response[genapi.FilePath], error) {
	err := ffmpeg.Input(c.Msg.From).
		Output(c.Msg.To, ffmpeg.KwArgs{"ar": "16000", "ac": "1"}).
		OverWriteOutput().ErrorToStdOut().Run()
	if err != nil {
		return nil, err
	}
	return connect_go.NewResponse(&genapi.FilePath{
		File: c.Msg.To,
	}), nil
}

func loadImageFromFile(imgPath string) image.Image {
	imageFile, _ := os.Open(imgPath)
	defer imageFile.Close()
	img, _, _ := image.Decode(imageFile)
	return img
}

func (p *Protoflow) OCR(ctx context.Context, c *connect_go.Request[genapi.FilePath]) (*connect_go.Response[genapi.OCRText], error) {
	log.Info().Str("file", c.Msg.File).Msg("ocr")
	client := gosseract.NewClient()
	defer client.Close()

	err := client.SetImage(c.Msg.File)
	if err != nil {
		return nil, err
	}

	text, err := client.Text()
	if err != nil {
		return nil, err
	}

	return connect_go.NewResponse(&genapi.OCRText{
		Text: text,
	}), nil
}

func (p *Protoflow) LiveTranscribe(ctx context.Context, c *connect_go.Request[genapi.TranscriptionRequest], c2 *connect_go.ServerStream[genapi.Segment]) error {
	model, err := whisper2.New(c.Msg.Model)
	if err != nil {
		return err
	}
	defer model.Close()

	obs, err := whisper.Process(model, c.Msg.FilePath, c.Msg)
	if err != nil {
		return err
	}
	<-obs.ForEach(func(item any) {
		t, ok := item.(*genapi.Segment)
		if !ok {
			return
		}

		err = c2.Send(t)
		if err != nil {
			log.Error().Err(err).Msg("error sending token")
		}
	}, func(err error) {
		log.Error().Err(err).Msg("error in observable")
	}, func() {
	})
	return nil
}

func (p *Protoflow) Transcribe(ctx context.Context, c *connect_go.Request[genapi.TranscriptionRequest]) (*connect_go.Response[genapi.Transcription], error) {
	return nil, nil
}
