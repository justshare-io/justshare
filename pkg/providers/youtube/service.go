package youtube

import (
	"context"
	"fmt"
	"github.com/google/wire"
	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
)

const (
	apiKey      = "YOUR_API_KEY" // Replace YOUR_API_KEY with your actual YouTube Data API key
	channelName = "breadchris"   // The username of the YouTube channel
)

var ProviderSet = wire.NewSet(
	NewYoutube,
	NewConfig,
)

type Youtube struct {
	c Config
}

func NewYoutube(config Config) *Youtube {
	return &Youtube{
		c: config,
	}
}

func (s *Youtube) UserIsLive(name string) (bool, error) {
	ctx := context.Background()
	youtubeService, err := youtube.NewService(ctx, option.WithAPIKey(s.c.APIKey))
	if err != nil {
		return false, err
	}
	return checkIfUserIsLive(ctx, youtubeService, channelName)
}

func checkIfUserIsLive(ctx context.Context, service *youtube.Service, username string) (bool, error) {
	searchResponse, err := service.Search.List([]string{"snippet"}).Q(username).Type("channel").Do()
	if err != nil {
		return false, err
	}

	if len(searchResponse.Items) == 0 {
		return false, fmt.Errorf("no channel found for username: %s", username)
	}

	channelID := searchResponse.Items[0].Snippet.ChannelId

	// Now, check if the channel has an active live broadcast
	liveBroadcastResponse, err := service.Search.List([]string{"snippet"}).
		ChannelId(channelID).
		EventType("live").
		Type("video").
		Do()
	if err != nil {
		return false, err
	}

	return len(liveBroadcastResponse.Items) > 0, nil
}
