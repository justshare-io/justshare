package cli

import (
	"github.com/ergochat/ergo/irc"
	"github.com/ergochat/ergo/irc/logger"
	"github.com/google/wire"
	"github.com/justshare-io/justshare/pkg/log"
	"github.com/justshare-io/justshare/pkg/providers/discord"
	"github.com/justshare-io/justshare/pkg/server"
	"github.com/urfave/cli/v2"
	"log/slog"
	"os"
)

type Commands struct {
	Serve *cli.Command
	Sync  *cli.Command
}

var ProviderSet = wire.NewSet(
	NewApp,
	discord.ProviderSet,
)

func NewApp(
	// TODO breadchris needed so wire will pick it up as a dep
	log *log.Log,
	apiServer *server.APIHTTPServer,
	discord *discord.Session,
) *cli.App {
	return &cli.App{
		Name:   "justshare",
		Usage:  "Save and search for information.",
		Action: NewServeAction(apiServer),
		Commands: []*cli.Command{
			NewServeCommand(apiServer),
			NewDockerCommand(),
			{
				Name:  "discord",
				Flags: []cli.Flag{},
				Action: func(c *cli.Context) error {
					mc := discord.Messages.Subscribe("justshare")
					for {
						select {
						case msg := <-mc:
							slog.Debug("discord message", "msg", msg)
						}
					}
				},
			},
			{
				Name: "irc",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:    "config",
						Aliases: []string{"c"},
						Value:   "ircd.yaml",
					},
					&cli.StringFlag{
						Name:    "cwd",
						Aliases: []string{"d"},
						Value:   "",
					},
				},
				Action: func(c *cli.Context) error {
					// set cwd
					cwd := c.String("cwd")
					if cwd != "" {
						err := os.Chdir(cwd)
						if err != nil {
							return err
						}
					}

					// https://github.com/kiwiirc/webircgateway

					config, err := irc.LoadConfig(c.String("config"))
					if err != nil {
						return err
					}

					logman, err := logger.NewManager(config.Logging)
					if err != nil {
						return err
					}

					server, err := irc.NewServer(config, logman)
					if err != nil {
						return err
					}

					server.Run()
					return nil
				},
			},
		},
	}
}
