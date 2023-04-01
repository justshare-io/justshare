// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package cli

import (
	"github.com/lunabrain-ai/lunabrain/pkg/api"
	"github.com/lunabrain-ai/lunabrain/pkg/chat/discord"
	"github.com/lunabrain-ai/lunabrain/pkg/client"
	"github.com/lunabrain-ai/lunabrain/pkg/client/html"
	"github.com/lunabrain-ai/lunabrain/pkg/config"
	"github.com/lunabrain-ai/lunabrain/pkg/pipeline"
	"github.com/lunabrain-ai/lunabrain/pkg/pipeline/collect"
	"github.com/lunabrain-ai/lunabrain/pkg/pipeline/normalize"
	"github.com/lunabrain-ai/lunabrain/pkg/pipeline/normalize/text"
	"github.com/lunabrain-ai/lunabrain/pkg/pipeline/publish"
	"github.com/lunabrain-ai/lunabrain/pkg/pipeline/scrape"
	"github.com/lunabrain-ai/lunabrain/pkg/python"
	"github.com/lunabrain-ai/lunabrain/pkg/store"
	"github.com/lunabrain-ai/lunabrain/pkg/store/db"
	"github.com/urfave/cli/v2"
)

// Injectors from wire.go:

func Wire() (*cli.App, error) {
	provider, err := config.NewConfigProvider()
	if err != nil {
		return nil, err
	}
	apiConfig, err := api.NewConfig(provider)
	if err != nil {
		return nil, err
	}
	folderCache, err := store.NewFolderCache()
	if err != nil {
		return nil, err
	}
	dbStore, err := db.NewDB(folderCache)
	if err != nil {
		return nil, err
	}
	pythonConfig, err := python.NewConfig(provider)
	if err != nil {
		return nil, err
	}
	pythonClient, err := python.NewPythonClient(pythonConfig)
	if err != nil {
		return nil, err
	}
	audioNormalizer, err := normalize.NewAudioNormalizer(pythonClient)
	if err != nil {
		return nil, err
	}
	normalizeConfig, err := normalize.NewConfig(provider)
	if err != nil {
		return nil, err
	}
	scrapeConfig, err := scrape.NewConfig(provider)
	if err != nil {
		return nil, err
	}
	scraper := scrape.NewScraper(scrapeConfig)
	files, err := store.NewBucket(folderCache)
	if err != nil {
		return nil, err
	}
	crawler := scrape.NewCrawler(files)
	urlNormalizer, err := normalize.NewURLNormalizer(normalizeConfig, pythonClient, scraper, crawler)
	if err != nil {
		return nil, err
	}
	normalizer, err := normalize.NewNormalizer(audioNormalizer, urlNormalizer, dbStore, pythonClient)
	if err != nil {
		return nil, err
	}
	summarizer, err := text.NewSummarizer(pythonClient)
	if err != nil {
		return nil, err
	}
	discordConfig, err := discord.NewConfig(provider)
	if err != nil {
		return nil, err
	}
	session, err := discord.NewDiscordSession(discordConfig)
	if err != nil {
		return nil, err
	}
	publishConfig, err := publish.NewConfig(provider)
	if err != nil {
		return nil, err
	}
	publishDiscord := publish.NewDiscord(session, publishConfig, dbStore)
	publishPublish := publish.NewPublisher(publishDiscord)
	contentWorkflow := pipeline.NewContentWorkflow(dbStore, normalizer, summarizer, files, publishPublish)
	server := api.NewAPIServer(dbStore, contentWorkflow)
	htmlHTML := html.NewHTML()
	apihttpServer := client.NewAPIHTTPServer(apiConfig, server, htmlHTML)
	discordCollector := collect.NewDiscordCollector(session, dbStore)
	hnCollect := collect.NewHNCollector(session, dbStore, contentWorkflow)
	app := NewApp(apihttpServer, normalizer, summarizer, contentWorkflow, discordCollector, hnCollect)
	return app, nil
}
