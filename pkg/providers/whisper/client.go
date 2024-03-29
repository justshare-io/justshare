package whisper

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"github.com/google/wire"
	"github.com/justshare-io/justshare/pkg/bucket"
	"github.com/justshare-io/justshare/pkg/gen/content"
	"github.com/justshare-io/justshare/pkg/providers/openai"
	"github.com/pkg/errors"
	"github.com/reactivex/rxgo/v2"
	gopenai "github.com/sashabaranov/go-openai"
	"log/slog"
	"os"
	"os/exec"
	"regexp"
	"strconv"
	"strings"
)

const (
	transModel   = "models/ggml-base.en.bin"
	maxChunkSize = 25 * 1024 * 1024 // 25 MB in bytes
)

type Client struct {
	config       Config
	openaiConfig openai.Config
	builder      *bucket.Builder
}

var ProviderSet = wire.NewSet(
	NewConfig,
	NewClient,
)

func NewClient(
	config Config,
	openaiConfig openai.Config,
	builder *bucket.Builder,
) *Client {
	return &Client{
		config:       config,
		openaiConfig: openaiConfig,
		builder:      builder,
	}
}

// TODO breadchris captureDevice seems awkward here
func (a *Client) Transcribe(ctx context.Context, id, filePath string, captureDevice int32) rxgo.Observable {
	slog.Debug("transcribing audio with whisper", "id", id, "filePath", filePath)
	if a.config.Offline {
		return a.tmpOfflineTranscription(ctx, id, filePath, captureDevice)
	} else {
		return a.apiTranscription(ctx, id, filePath)
	}
}

func (a *Client) apiTranscription(ctx context.Context, id string, filePath string) rxgo.Observable {
	c := gopenai.NewClient(a.openaiConfig.APIKey)

	// TODO breadchris figure out what code should be in the producer
	return rxgo.Create([]rxgo.Producer{func(ctx context.Context, next chan<- rxgo.Item) {
		// TODO breadchris maybe support streams instead of just files?
		var duration float64
		err := splitWAVFile(a.builder, id, filePath, maxChunkSize, func(chunkFilePath string) error {
			slog.Debug("transcribing chunk", "id", id, "chunkFilePath", chunkFilePath)

			req := gopenai.AudioRequest{
				FilePath: chunkFilePath,
				Model:    gopenai.Whisper1,
				Format:   gopenai.AudioResponseFormatVerboseJSON,
			}
			res, err := c.CreateTranscription(ctx, req)
			if err != nil {
				return err
			}

			duration += res.Duration

			for _, s := range res.Segments {
				seg := content.Segment{
					Num:       uint32(s.ID),
					Text:      s.Text,
					StartTime: uint64(duration + s.Start),
					EndTime:   uint64(duration + s.End),
				}
				next <- rxgo.Of(&seg)
			}

			slog.Debug("transcription done", "id", id)
			return nil
		})
		if err != nil {
			next <- rxgo.Error(err)
			return
		}
	}}, rxgo.WithContext(ctx))
}

// TODO breadchris debug why stream is returning not great transcription
func (a *Client) tmpOfflineTranscription(ctx context.Context, id, file string, captureDevice int32) rxgo.Observable {
	return rxgo.Create([]rxgo.Producer{func(ctx context.Context, next chan<- rxgo.Item) {
		var duration uint64
		err := splitWAVFile(a.builder, id, file, maxChunkSize, func(chunkFilePath string) error {
			cmd := exec.Command("third_party/whisper.cpp/main")
			_, err := os.Stat(transModel)
			if err != nil {
				next <- rxgo.Error(errors.Wrapf(err, "failed to stat model %s", transModel))
				return err
			}

			cmd.Args = append(cmd.Args, "-owts", "-f", file)
			cmd.Args = append(
				cmd.Args,
				"-m", transModel,
			)

			slog.Debug("running stream", "cmd", cmd.String())
			stdout, err := cmd.StdoutPipe()
			if err != nil {
				next <- rxgo.Error(err)
				return err
			}
			stderr, err := cmd.StderrPipe()
			if err != nil {
				next <- rxgo.Error(err)
				return err
			}

			lineRegex := regexp.MustCompile(`\[(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\]\s+(.+)`)
			var segmentNum uint32

			stdoutScan := bufio.NewScanner(stdout)
			var done chan struct{}
			go func() {
				for stdoutScan.Scan() {
					t := stdoutScan.Text()
					matches := lineRegex.FindStringSubmatch(t)
					if len(matches) == 4 {
						startTime := parseTime(matches[1])
						endTime := parseTime(matches[2])
						text := matches[3]
						slog.Debug("found segment", "segment", t, "startTime", startTime, "endTime", endTime, "text", text)

						duration += endTime
						seg := content.Segment{
							Num:       segmentNum,
							Text:      text,
							StartTime: duration + startTime,
							EndTime:   duration + endTime,
						}
						next <- rxgo.Of(&seg)
						segmentNum++
					}
				}
				done <- struct{}{}
			}()

			stderrScan := bufio.NewScanner(stderr)
			go func() {
				for stderrScan.Scan() {
					// next <- rxgo.Of(stderrScan.Text())
					slog.Debug(stderrScan.Text(), "stream")
				}
			}()

			err = cmd.Start()
			if err != nil {
				next <- rxgo.Error(err)
				return err
			}

			go func() {
				<-ctx.Done()
				slog.Info("killing stream")
				cmd.Process.Kill()
			}()

			err = cmd.Wait()
			if err != nil {
				next <- rxgo.Error(err)
				return err
			}
			<-done
			return nil
		})
		if err != nil {
			next <- rxgo.Error(err)
			return
		}
	}}, rxgo.WithContext(ctx))
}

func parseTime(timeStr string) uint64 {
	parts := strings.Split(timeStr, ":")
	hours, _ := strconv.Atoi(parts[0])
	minutes, _ := strconv.Atoi(parts[1])
	secondsParts := strings.Split(parts[2], ".")
	seconds, _ := strconv.Atoi(secondsParts[0])
	milliseconds, _ := strconv.Atoi(secondsParts[1])

	totalMilliseconds := uint64(hours*3600000 + minutes*60000 + seconds*1000 + milliseconds)
	return totalMilliseconds
}

func (a *Client) offlineTranscription(ctx context.Context, file string, captureDevice int32) rxgo.Observable {
	return rxgo.Create([]rxgo.Producer{func(ctx context.Context, next chan<- rxgo.Item) {
		cmd := exec.Command("third_party/whisper.cpp/stream")
		_, err := os.Stat(transModel)
		if err != nil {
			next <- rxgo.Error(errors.Wrapf(err, "failed to stat model %s", transModel))
			return
		}

		if file != "" {
			cmd.Args = append(cmd.Args, "main", "-owts", "-f", file)
		} else {
			cmd.Args = append(
				cmd.Args,
				"stream",
				// TODO breadchris offer selection for input stream
				"-c", fmt.Sprintf("%d", captureDevice),
			)
		}
		cmd.Args = append(
			cmd.Args,
			"-m", transModel,
		)

		slog.Debug("running stream", "cmd", cmd.String())
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
		var done chan struct{}
		go func() {
			for stdoutScan.Scan() {
				var seg content.Segment
				if err := json.Unmarshal([]byte(stdoutScan.Text()), &seg); err != nil {
					next <- rxgo.Error(err)
					continue
				}
				next <- rxgo.Of(&seg)
			}
			done <- struct{}{}
		}()

		stderrScan := bufio.NewScanner(stderr)
		go func() {
			for stderrScan.Scan() {
				// next <- rxgo.Of(stderrScan.Text())
				slog.Debug(stderrScan.Text(), "stream")
			}
		}()

		err = cmd.Start()
		if err != nil {
			next <- rxgo.Error(err)
			return
		}

		go func() {
			<-ctx.Done()
			slog.Info("killing stream")
			cmd.Process.Kill()
		}()

		err = cmd.Wait()
		if err != nil {
			next <- rxgo.Error(err)
			return
		}
		<-done
	}}, rxgo.WithContext(ctx))
}
