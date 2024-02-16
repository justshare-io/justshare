package cli

import (
	"github.com/ergochat/ergo/irc"
	"github.com/ergochat/ergo/irc/logger"
	"github.com/justshare-io/justshare/pkg/log"
	"github.com/justshare-io/justshare/pkg/server"
	"github.com/urfave/cli/v2"
	"os"
)

type Commands struct {
	Serve *cli.Command
	Sync  *cli.Command
}

func NewApp(
	// TODO breadchris needed so wire will pick it up as a dep
	log *log.Log,
	apiServer *server.APIHTTPServer,
) *cli.App {
	return &cli.App{
		Name:   "justshare",
		Usage:  "Save and search for information.",
		Action: NewServeAction(apiServer),
		Commands: []*cli.Command{
			NewServeCommand(apiServer),
			NewDockerCommand(),
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
