package twillio

import (
	"github.com/twilio/twilio-go"
	tapi "github.com/twilio/twilio-go/rest/api/v2010"
)

type TwilioService struct {
	client *twilio.RestClient
	config Config
}

func NewTwilioService(cfg Config) *TwilioService {
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: cfg.AccountSID,
		Password: cfg.AuthToken,
	})

	return &TwilioService{
		client: client,
		config: cfg,
	}
}

func (s *TwilioService) SendSMS(to, body string) error {
	params := &tapi.CreateMessageParams{}
	params.SetTo(to)
	params.SetFrom(s.config.Number)
	params.SetBody(body)

	_, err := s.client.Api.CreateMessage(params)
	return err
}
