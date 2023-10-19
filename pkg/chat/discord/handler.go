package discord

import (
	"context"
	"fmt"
	"github.com/lunabrain-ai/lunabrain/pkg/openai"
	"log/slog"
	"strings"
	"time"

	"github.com/bwmarrin/discordgo"
)

type MessageInfo struct {
	IsBotCommand bool
}

type MessageHandlerFunc func(ctx context.Context, info MessageInfo, s *discordgo.Session, m *discordgo.MessageCreate)
type CommandHandlerFunc func(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate)

type MessageHandler struct {
	Handler MessageHandlerFunc
}

type CommandHandler struct {
	Command          discordgo.ApplicationCommand
	Handler          CommandHandlerFunc
	MessageComponent bool
	GuildID          string
}

type Handler struct {
	config  Config
	msgHdlr []*MessageHandler
	cmds    []*CommandHandler
	cmdStr  string
	cmdMap  map[string]CommandHandlerFunc
	session *discordgo.Session
	openai  *openai.Agent
}

func NewHandler(config Config, session *discordgo.Session, openai *openai.Agent) (*Handler, error) {
	cmdStr := fmt.Sprintf("<@%s>", config.ApplicationID)

	handlers := []*MessageHandler{
		{
			Handler: func(ctx context.Context, info MessageInfo, s *discordgo.Session, m *discordgo.MessageCreate) {
				if info.IsBotCommand {
					_, _ = s.ChannelMessageSend(m.ChannelID, "pong")
				}
			},
		},
	}

	questionOption := "question"
	descriptionOption := "description"

	persona := "You are the most interesting man in the world. Answer this question: "

	commands := []*CommandHandler{
		{
			Command: discordgo.ApplicationCommand{
				Name:        "persona",
				Type:        discordgo.ChatApplicationCommand,
				Description: "set the persona for the bot",
				Options: []*discordgo.ApplicationCommandOption{
					{
						Type:        discordgo.ApplicationCommandOptionString,
						Name:        descriptionOption,
						Description: "Description",
						Required:    true,
					},
				},
			},
			Handler: func(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate) {
				slog.Debug("persona command", "options", i.ApplicationCommandData().Options)
				options := i.ApplicationCommandData().Options
				optionMap := make(map[string]*discordgo.ApplicationCommandInteractionDataOption, len(options))
				for _, opt := range options {
					optionMap[opt.Name] = opt
				}

				desc := ""
				if option, ok := optionMap[desc]; ok {
					desc = option.StringValue()
				}
				persona = desc
			},
		},
		{
			Command: discordgo.ApplicationCommand{
				Name:        "ask",
				Type:        discordgo.ChatApplicationCommand,
				Description: "ask somethin'",
				Options: []*discordgo.ApplicationCommandOption{
					{
						Type:        discordgo.ApplicationCommandOptionString,
						Name:        questionOption,
						Description: "Question",
						Required:    true,
					},
				},
			},
			Handler: func(ctx context.Context, s *discordgo.Session, i *discordgo.InteractionCreate) {
				slog.Debug("ask command", "options", i.ApplicationCommandData().Options)
				options := i.ApplicationCommandData().Options
				optionMap := make(map[string]*discordgo.ApplicationCommandInteractionDataOption, len(options))
				for _, opt := range options {
					optionMap[opt.Name] = opt
				}

				question := ""
				if option, ok := optionMap[questionOption]; ok {
					question = option.StringValue()
				}
				err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
					Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
				})
				if err != nil {
					slog.Error("failed to acknowledge ask command", "error", err)
					return
				}
				answer := "hold up..."
				_, err = s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
					Content: &answer,
				})
				basePrompt := persona
				answer, err = openai.Prompt(ctx, basePrompt+question)
				if err != nil {
					slog.Error("failed to respond to ask command", "error", err)
					answer = "whups, something went wrong"
					_, err = s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
						Content: &answer,
					})
					return
				}
				_, err = s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
					Content: &answer,
				})
				if err != nil {
					slog.Error("failed to respond to ask command", "error", err)
					return
				}
			},
		},
	}

	handlerMap := make(map[string]CommandHandlerFunc)
	for _, cmd := range commands {
		handlerMap[cmd.Command.Name] = cmd.Handler
	}

	//registeredCommands, err := session.ApplicationCommands(config.ApplicationID, "")
	//if err != nil {
	//	slog.Error("failed to fetch registered commands", "error", err)
	//	return nil, err
	//}
	//for _, v := range registeredCommands {
	//	err := session.ApplicationCommandDelete(config.ApplicationID, v.GuildID, v.ID)
	//	if err != nil {
	//		slog.Error("failed to delete command", "error", err)
	//		return nil, err
	//	}
	//	slog.Debug("deleted command", "name", v.Name, "id", v.ID)
	//}

	h := &Handler{
		config:  config,
		session: session,
		msgHdlr: handlers,
		cmds:    commands,
		cmdStr:  cmdStr,
		cmdMap:  handlerMap,
	}
	return h, h.setupHandlers()
}

func (d *Handler) setupHandlers() error {
	for _, v := range d.cmds {
		//if v.MessageComponent {
		//	continue
		//}

		ccmd, err := d.session.ApplicationCommandCreate(d.config.ApplicationID, v.GuildID, &v.Command)
		if err != nil {
			slog.Error("failed to register command", "name", v.Command.Name, "err", err)
			return err
		}
		slog.Info("registered command", "name", ccmd.Name, "id", ccmd.ID)
	}

	d.session.AddHandler(func(s *discordgo.Session, m *discordgo.MessageCreate) {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()

		info := MessageInfo{
			IsBotCommand: strings.Contains(m.Content, d.cmdStr),
		}

		if info.IsBotCommand {
			m.Content = strings.Replace(m.Content, d.cmdStr, "", 1)
		}

		for _, h := range d.msgHdlr {
			h.Handler(ctx, info, s, m)
		}
	})

	d.session.AddHandler(func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()

		switch i.Type {
		case discordgo.InteractionApplicationCommand:
			slog.Info("interaction application command", "name", i.ApplicationCommandData().Name)
			if h, ok := d.cmdMap[i.ApplicationCommandData().Name]; ok {
				h(ctx, s, i)
			}
		case discordgo.InteractionMessageComponent:
			customID := i.MessageComponentData().CustomID
			slog.Info("interaction message component", "customID", customID)
			if h, ok := d.cmdMap[customID]; ok {
				h(ctx, s, i)
			}
		}
	})
	return nil
}
