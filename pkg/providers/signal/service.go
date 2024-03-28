package signal

import (
	"github.com/google/wire"
	"io"
	"log/slog"
	"net/http"
)

var ProviderSet = wire.NewSet(New, NewConfig)

type Signal struct {
	c Config
}

func New(c Config) *Signal {
	return &Signal{
		c: c,
	}
}

func (s *Signal) Send() {

}

func (s *Signal) Receive() error {
	data, err := getJSON(s.c.BaseURL + "/v1/receive/<number>")
	if err != nil {
		return err
	}
	for _, msg := range *data {
		slog.Debug("Signal message", "message", msg)
		if msg.Envelope.DataMessage != nil {
			if msg.Envelope.DataMessage.Message != nil {
				slog.Debug("Signal message", "message", msg.Envelope.DataMessage.Message)
			}
		}
	}
	return nil
}

func getJSON(url string) (*SignalMessages, error) {
	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	data, err := UnmarshalWelcome(body)
	return &data, nil
}
