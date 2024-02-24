package server

import (
	"context"
	"fmt"
	"github.com/a-h/templ"
	"github.com/bufbuild/connect-go"
	grpcreflect "github.com/bufbuild/connect-grpcreflect-go"
	"github.com/google/wire"
	"github.com/gorilla/sessions"
	"github.com/justshare-io/justshare/js/dist/site"
	"github.com/justshare-io/justshare/pkg/bucket"
	"github.com/justshare-io/justshare/pkg/chat"
	"github.com/justshare-io/justshare/pkg/content"
	"github.com/justshare-io/justshare/pkg/content/normalize"
	"github.com/justshare-io/justshare/pkg/event"
	"github.com/justshare-io/justshare/pkg/gen/chat/chatconnect"
	"github.com/justshare-io/justshare/pkg/gen/content/contentconnect"
	"github.com/justshare-io/justshare/pkg/gen/event/eventconnect"
	"github.com/justshare-io/justshare/pkg/gen/kubes/kubesconnect"
	"github.com/justshare-io/justshare/pkg/gen/user/userconnect"
	"github.com/justshare-io/justshare/pkg/group"
	shttp "github.com/justshare-io/justshare/pkg/http"
	"github.com/justshare-io/justshare/pkg/kubes"
	"github.com/justshare-io/justshare/pkg/server/view"
	"github.com/justshare-io/justshare/pkg/user"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/pkg/errors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log/slog"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
)

type APIHTTPServer struct {
	config         content.Config
	contentService *content.Service
	sessionManager *shttp.SessionManager
	userService    *user.Service
	chatService    *chat.Service
	eventService   *event.Service
	kubesService   *kubes.Service
	handler        *gothic.Handler
	builder        *bucket.Builder
}

var (
	ProviderSet = wire.NewSet(
		content.ProviderSet,
		group.ProviderSet,
		user.ProviderSet,
		chat.ProviderSet,
		kubes.ProviderSet,
		normalize.New,
		shttp.NewSession,
		content.NewConfig,
		event.ProviderSet,
		New,
	)
)

func New(
	config content.Config,
	apiServer *content.Service,
	builder *bucket.Builder,
	sessionManager *shttp.SessionManager,
	userService *user.Service,
	chatService *chat.Service,
	eventService *event.Service,
	kubesService *kubes.Service,
) *APIHTTPServer {
	return &APIHTTPServer{
		config:         config,
		contentService: apiServer,
		builder:        builder,
		sessionManager: sessionManager,
		userService:    userService,
		chatService:    chatService,
		eventService:   eventService,
		kubesService:   kubesService,
		handler: gothic.NewHandler(
			sessions.NewCookieStore([]byte(config.SessionSecret)),
			gothic.WithProviders(
				google.New(
					config.GoogleClientID,
					config.GoogleClientSecret,
					// TODO breachris derive this from config
					fmt.Sprintf("%s/auth/google/callback", config.ExternalURL),
					"email", "profile"),
			),
		),
	}
}

func (a *APIHTTPServer) startGoogleAuth(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()

	q.Set("provider", "google")
	// TODO breadchris update this path to take the "next url"
	// aren't their security concerns here?
	q.Set("redirect_to", fmt.Sprintf("%s/auth/google/callback", a.config.ExternalURL))
	r.URL.RawQuery = q.Encode()
	a.handler.BeginAuthHandler(w, r)
}

func (a *APIHTTPServer) handleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	q.Set("provider", "google")
	r.URL.RawQuery = q.Encode()
	u, err := a.handler.CompleteUserAuth(w, r)
	if err != nil {
		slog.Error("failed to complete user auth", "error", err)
		return
	}

	err = a.userService.ConnectOAuthUser(r.Context(), u)
	if err != nil {
		slog.Error("failed to connect oauth user", "error", err)
		return
	}
	http.Redirect(w, r, "/app", http.StatusFound)
}

// TODO breadchris the initialization of this feels awkward
func (a *APIHTTPServer) NewAPIHandler() (http.Handler, error) {
	interceptors := connect.WithInterceptors(NewLogInterceptor())

	// TODO breadchris add authz interceptor

	apiRoot := http.NewServeMux()

	apiRoot.HandleFunc("/auth/google", a.startGoogleAuth)
	apiRoot.HandleFunc("/auth/google/callback", a.handleGoogleCallback)

	// TODO breadchris services should be registered in a more modular way
	apiRoot.Handle(contentconnect.NewContentServiceHandler(a.contentService, interceptors))
	apiRoot.Handle(userconnect.NewUserServiceHandler(a.userService, interceptors))
	apiRoot.Handle(chatconnect.NewChatServiceHandler(a.chatService, interceptors))
	apiRoot.Handle(eventconnect.NewEventServiceHandler(a.eventService, interceptors))
	if a.kubesService != nil {
		apiRoot.Handle(kubesconnect.NewKubesServiceHandler(a.kubesService, interceptors))
	}
	reflector := grpcreflect.NewStaticReflector(
		"content.ContentService",
		"user.UserService",
		"chat.ChatService",
		"event.EventService",
		"kubes.KubesService",
	)
	recoverCall := func(_ context.Context, spec connect.Spec, _ http.Header, p any) error {
		slog.Error("panic", "err", fmt.Sprintf("%+v", p))
		if err, ok := p.(error); ok {
			return err
		}
		return fmt.Errorf("panic: %v", p)
	}
	apiRoot.Handle(grpcreflect.NewHandlerV1(reflector, connect.WithRecover(recoverCall)))
	// Many tools still expect the older version of the server reflection Service, so
	// most servers should mount both handlers.
	apiRoot.Handle(grpcreflect.NewHandlerV1Alpha(reflector, connect.WithRecover(recoverCall)))

	assets := site.Assets
	fs := http.FS(site.Assets)
	httpFileServer := http.FileServer(fs)

	// TODO breachris this should come from builder
	d, err := a.builder.Dir("upload").Build()
	if err != nil {
		return nil, errors.Wrapf(err, "failed to build upload directory")
	}
	f := http.FS(os.DirFS(d))
	mediaFileServer := http.FileServer(f)

	// TODO breadchris brittle path
	blog := http.FS(os.DirFS("data/blog"))
	blogFileServer := http.FileServer(blog)

	u, err := url.Parse(a.config.Proxy)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to parse proxy")
	}
	proxy := httputil.NewSingleHostReverseProxy(u)

	muxRoot := http.NewServeMux()

	muxRoot.HandleFunc("/upload", a.fileUploadHandler)

	muxRoot.HandleFunc("/webhook", func(w http.ResponseWriter, r *http.Request) {
		// dump http request
		dump, err := httputil.DumpRequest(r, true)
		if err != nil {
			slog.Error("failed to dump request", "error", err)
			return
		}
		slog.Debug("webhook request", "dump", string(dump))
	})

	// TODO breadchris path routing should be done in a more modular way, as opposed to being done all in the handler
	muxRoot.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/@") {
			_ = strings.Replace(r.URL.Path, "/@", "", 1)
			blogFileServer.ServeHTTP(w, r)
			return
		}

		if r.URL.Path == "/" {
			templ.Handler(view.Page(view.Index(view.Feature{
				Name:        "Justshare",
				Description: "Justshare is a platform for sharing and collaborating on content. It is a work in progress and is being developed by the community.",
			}, view.Stat{
				Id:    "1",
				Name:  "Total Users",
				Value: "100",
			}, view.Item{
				Name: "Justshare",
				Href: "/",
			}))).ServeHTTP(w, r)
			return
		}
		if r.URL.Path == "/upload" || strings.HasPrefix(r.URL.Path, "/upload/") {
			r.URL.Path = strings.Replace(r.URL.Path, "/upload", "", 1)
			mediaFileServer.ServeHTTP(w, r)
			return
		}
		if r.URL.Path == "/app" || strings.HasPrefix(r.URL.Path, "/app/") || r.URL.Path == "/esbuild" {
			r.URL.Path = strings.Replace(r.URL.Path, "/app", "", 1)
			if a.config.Proxy != "" {
				slog.Debug("proxying request", "path", r.URL.Path)
				proxy.ServeHTTP(w, r)
			} else {
				filePath := r.URL.Path
				if strings.Index(r.URL.Path, "/") == 0 {
					filePath = r.URL.Path[1:]
				}

				f, err := assets.Open(filePath)
				if os.IsNotExist(err) {
					r.URL.Path = "/"
				}
				if err == nil {
					f.Close()
				}
				slog.Debug("serving file", "path", filePath)
				httpFileServer.ServeHTTP(w, r)
			}
			return
		}
		if strings.HasPrefix(r.URL.Path, "/api/") {
			r.URL.Path = strings.Replace(r.URL.Path, "/api", "", 1)
		}
		apiRoot.ServeHTTP(w, r)
		return
	})

	// TODO breadchris enable/disable based on if we are in dev mode
	//bucketRoute, handler := a.builder.HandleSignedURLs()
	//muxRoot.Handle(bucketRoute, handler)
	return a.sessionManager.LoadAndSave(a.loggingMiddleware(muxRoot)), nil
}

func (a *APIHTTPServer) Start() error {
	httpApiHandler, err := a.NewAPIHandler()
	if err != nil {
		return err
	}

	addr := fmt.Sprintf(":%s", a.config.Port)

	slog.Info("starting http server", "addr", addr)

	//go func() {
	//	log.Debug().Msg("starting protoflow server")
	// // TODO listen for interupt
	//	// TODO breadchris configure port
	//	err := a.p.HTTPServer.Serve(8080)
	//	if err != nil {
	//		log.Error().Err(err).Msg("failed to start protoflow server")
	//	}
	//}()

	return http.ListenAndServe(addr, h2c.NewHandler(corsMiddleware(httpApiHandler), &http2.Server{}))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// TODO breadchris how bad is this? lol
		origin := r.Header.Get("Origin")

		// TODO breadchris this should only be done for local dev
		w.Header().Set("Access-Control-Allow-Origin", origin)

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization, connect-protocol-version")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
