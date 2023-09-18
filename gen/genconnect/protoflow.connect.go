// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: protoflow.proto

package genconnect

import (
	context "context"
	errors "errors"
	connect_go "github.com/bufbuild/connect-go"
	gen "github.com/lunabrain-ai/lunabrain/gen"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect_go.IsAtLeastVersion0_1_0

const (
	// ProtoflowServiceName is the fully-qualified name of the ProtoflowService service.
	ProtoflowServiceName = "protoflow.ProtoflowService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// ProtoflowServiceDownloadYouTubeVideoProcedure is the fully-qualified name of the
	// ProtoflowService's DownloadYouTubeVideo RPC.
	ProtoflowServiceDownloadYouTubeVideoProcedure = "/protoflow.ProtoflowService/DownloadYouTubeVideo"
	// ProtoflowServiceGetSessionsProcedure is the fully-qualified name of the ProtoflowService's
	// GetSessions RPC.
	ProtoflowServiceGetSessionsProcedure = "/protoflow.ProtoflowService/GetSessions"
	// ProtoflowServiceGetSessionProcedure is the fully-qualified name of the ProtoflowService's
	// GetSession RPC.
	ProtoflowServiceGetSessionProcedure = "/protoflow.ProtoflowService/GetSession"
	// ProtoflowServiceDeleteSessionProcedure is the fully-qualified name of the ProtoflowService's
	// DeleteSession RPC.
	ProtoflowServiceDeleteSessionProcedure = "/protoflow.ProtoflowService/DeleteSession"
	// ProtoflowServiceGetPromptsProcedure is the fully-qualified name of the ProtoflowService's
	// GetPrompts RPC.
	ProtoflowServiceGetPromptsProcedure = "/protoflow.ProtoflowService/GetPrompts"
	// ProtoflowServiceNewPromptProcedure is the fully-qualified name of the ProtoflowService's
	// NewPrompt RPC.
	ProtoflowServiceNewPromptProcedure = "/protoflow.ProtoflowService/NewPrompt"
	// ProtoflowServiceUploadContentProcedure is the fully-qualified name of the ProtoflowService's
	// UploadContent RPC.
	ProtoflowServiceUploadContentProcedure = "/protoflow.ProtoflowService/UploadContent"
	// ProtoflowServiceInferProcedure is the fully-qualified name of the ProtoflowService's Infer RPC.
	ProtoflowServiceInferProcedure = "/protoflow.ProtoflowService/Infer"
	// ProtoflowServiceChatProcedure is the fully-qualified name of the ProtoflowService's Chat RPC.
	ProtoflowServiceChatProcedure = "/protoflow.ProtoflowService/Chat"
	// ProtoflowServiceConvertFileProcedure is the fully-qualified name of the ProtoflowService's
	// ConvertFile RPC.
	ProtoflowServiceConvertFileProcedure = "/protoflow.ProtoflowService/ConvertFile"
	// ProtoflowServiceGenerateImagesProcedure is the fully-qualified name of the ProtoflowService's
	// GenerateImages RPC.
	ProtoflowServiceGenerateImagesProcedure = "/protoflow.ProtoflowService/GenerateImages"
	// ProtoflowServiceRegisterProcedure is the fully-qualified name of the ProtoflowService's Register
	// RPC.
	ProtoflowServiceRegisterProcedure = "/protoflow.ProtoflowService/Register"
	// ProtoflowServiceLoginProcedure is the fully-qualified name of the ProtoflowService's Login RPC.
	ProtoflowServiceLoginProcedure = "/protoflow.ProtoflowService/Login"
	// ProtoflowServiceLogoutProcedure is the fully-qualified name of the ProtoflowService's Logout RPC.
	ProtoflowServiceLogoutProcedure = "/protoflow.ProtoflowService/Logout"
)

// ProtoflowServiceClient is a client for the protoflow.ProtoflowService service.
type ProtoflowServiceClient interface {
	DownloadYouTubeVideo(context.Context, *connect_go.Request[gen.YouTubeVideo]) (*connect_go.Response[gen.FilePath], error)
	GetSessions(context.Context, *connect_go.Request[gen.GetSessionsRequest]) (*connect_go.Response[gen.GetSessionsResponse], error)
	GetSession(context.Context, *connect_go.Request[gen.GetSessionRequest]) (*connect_go.Response[gen.GetSessionResponse], error)
	DeleteSession(context.Context, *connect_go.Request[gen.DeleteSessionRequest]) (*connect_go.Response[gen.Empty], error)
	GetPrompts(context.Context, *connect_go.Request[gen.GetPromptsRequest]) (*connect_go.Response[gen.GetPromptsResponse], error)
	NewPrompt(context.Context, *connect_go.Request[gen.Prompt]) (*connect_go.Response[gen.Prompt], error)
	UploadContent(context.Context, *connect_go.Request[gen.UploadContentRequest]) (*connect_go.ServerStreamForClient[gen.ChatResponse], error)
	Infer(context.Context, *connect_go.Request[gen.InferRequest]) (*connect_go.ServerStreamForClient[gen.InferResponse], error)
	Chat(context.Context, *connect_go.Request[gen.ChatRequest]) (*connect_go.ServerStreamForClient[gen.ChatResponse], error)
	ConvertFile(context.Context, *connect_go.Request[gen.ConvertFileRequest]) (*connect_go.Response[gen.FilePath], error)
	GenerateImages(context.Context, *connect_go.Request[gen.GenerateImagesRequest]) (*connect_go.Response[gen.GenerateImagesResponse], error)
	Register(context.Context, *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error)
	Login(context.Context, *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error)
	Logout(context.Context, *connect_go.Request[gen.Empty]) (*connect_go.Response[gen.Empty], error)
}

// NewProtoflowServiceClient constructs a client for the protoflow.ProtoflowService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewProtoflowServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) ProtoflowServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &protoflowServiceClient{
		downloadYouTubeVideo: connect_go.NewClient[gen.YouTubeVideo, gen.FilePath](
			httpClient,
			baseURL+ProtoflowServiceDownloadYouTubeVideoProcedure,
			opts...,
		),
		getSessions: connect_go.NewClient[gen.GetSessionsRequest, gen.GetSessionsResponse](
			httpClient,
			baseURL+ProtoflowServiceGetSessionsProcedure,
			opts...,
		),
		getSession: connect_go.NewClient[gen.GetSessionRequest, gen.GetSessionResponse](
			httpClient,
			baseURL+ProtoflowServiceGetSessionProcedure,
			opts...,
		),
		deleteSession: connect_go.NewClient[gen.DeleteSessionRequest, gen.Empty](
			httpClient,
			baseURL+ProtoflowServiceDeleteSessionProcedure,
			opts...,
		),
		getPrompts: connect_go.NewClient[gen.GetPromptsRequest, gen.GetPromptsResponse](
			httpClient,
			baseURL+ProtoflowServiceGetPromptsProcedure,
			opts...,
		),
		newPrompt: connect_go.NewClient[gen.Prompt, gen.Prompt](
			httpClient,
			baseURL+ProtoflowServiceNewPromptProcedure,
			opts...,
		),
		uploadContent: connect_go.NewClient[gen.UploadContentRequest, gen.ChatResponse](
			httpClient,
			baseURL+ProtoflowServiceUploadContentProcedure,
			opts...,
		),
		infer: connect_go.NewClient[gen.InferRequest, gen.InferResponse](
			httpClient,
			baseURL+ProtoflowServiceInferProcedure,
			opts...,
		),
		chat: connect_go.NewClient[gen.ChatRequest, gen.ChatResponse](
			httpClient,
			baseURL+ProtoflowServiceChatProcedure,
			opts...,
		),
		convertFile: connect_go.NewClient[gen.ConvertFileRequest, gen.FilePath](
			httpClient,
			baseURL+ProtoflowServiceConvertFileProcedure,
			opts...,
		),
		generateImages: connect_go.NewClient[gen.GenerateImagesRequest, gen.GenerateImagesResponse](
			httpClient,
			baseURL+ProtoflowServiceGenerateImagesProcedure,
			opts...,
		),
		register: connect_go.NewClient[gen.User, gen.User](
			httpClient,
			baseURL+ProtoflowServiceRegisterProcedure,
			opts...,
		),
		login: connect_go.NewClient[gen.User, gen.User](
			httpClient,
			baseURL+ProtoflowServiceLoginProcedure,
			opts...,
		),
		logout: connect_go.NewClient[gen.Empty, gen.Empty](
			httpClient,
			baseURL+ProtoflowServiceLogoutProcedure,
			opts...,
		),
	}
}

// protoflowServiceClient implements ProtoflowServiceClient.
type protoflowServiceClient struct {
	downloadYouTubeVideo *connect_go.Client[gen.YouTubeVideo, gen.FilePath]
	getSessions          *connect_go.Client[gen.GetSessionsRequest, gen.GetSessionsResponse]
	getSession           *connect_go.Client[gen.GetSessionRequest, gen.GetSessionResponse]
	deleteSession        *connect_go.Client[gen.DeleteSessionRequest, gen.Empty]
	getPrompts           *connect_go.Client[gen.GetPromptsRequest, gen.GetPromptsResponse]
	newPrompt            *connect_go.Client[gen.Prompt, gen.Prompt]
	uploadContent        *connect_go.Client[gen.UploadContentRequest, gen.ChatResponse]
	infer                *connect_go.Client[gen.InferRequest, gen.InferResponse]
	chat                 *connect_go.Client[gen.ChatRequest, gen.ChatResponse]
	convertFile          *connect_go.Client[gen.ConvertFileRequest, gen.FilePath]
	generateImages       *connect_go.Client[gen.GenerateImagesRequest, gen.GenerateImagesResponse]
	register             *connect_go.Client[gen.User, gen.User]
	login                *connect_go.Client[gen.User, gen.User]
	logout               *connect_go.Client[gen.Empty, gen.Empty]
}

// DownloadYouTubeVideo calls protoflow.ProtoflowService.DownloadYouTubeVideo.
func (c *protoflowServiceClient) DownloadYouTubeVideo(ctx context.Context, req *connect_go.Request[gen.YouTubeVideo]) (*connect_go.Response[gen.FilePath], error) {
	return c.downloadYouTubeVideo.CallUnary(ctx, req)
}

// GetSessions calls protoflow.ProtoflowService.GetSessions.
func (c *protoflowServiceClient) GetSessions(ctx context.Context, req *connect_go.Request[gen.GetSessionsRequest]) (*connect_go.Response[gen.GetSessionsResponse], error) {
	return c.getSessions.CallUnary(ctx, req)
}

// GetSession calls protoflow.ProtoflowService.GetSession.
func (c *protoflowServiceClient) GetSession(ctx context.Context, req *connect_go.Request[gen.GetSessionRequest]) (*connect_go.Response[gen.GetSessionResponse], error) {
	return c.getSession.CallUnary(ctx, req)
}

// DeleteSession calls protoflow.ProtoflowService.DeleteSession.
func (c *protoflowServiceClient) DeleteSession(ctx context.Context, req *connect_go.Request[gen.DeleteSessionRequest]) (*connect_go.Response[gen.Empty], error) {
	return c.deleteSession.CallUnary(ctx, req)
}

// GetPrompts calls protoflow.ProtoflowService.GetPrompts.
func (c *protoflowServiceClient) GetPrompts(ctx context.Context, req *connect_go.Request[gen.GetPromptsRequest]) (*connect_go.Response[gen.GetPromptsResponse], error) {
	return c.getPrompts.CallUnary(ctx, req)
}

// NewPrompt calls protoflow.ProtoflowService.NewPrompt.
func (c *protoflowServiceClient) NewPrompt(ctx context.Context, req *connect_go.Request[gen.Prompt]) (*connect_go.Response[gen.Prompt], error) {
	return c.newPrompt.CallUnary(ctx, req)
}

// UploadContent calls protoflow.ProtoflowService.UploadContent.
func (c *protoflowServiceClient) UploadContent(ctx context.Context, req *connect_go.Request[gen.UploadContentRequest]) (*connect_go.ServerStreamForClient[gen.ChatResponse], error) {
	return c.uploadContent.CallServerStream(ctx, req)
}

// Infer calls protoflow.ProtoflowService.Infer.
func (c *protoflowServiceClient) Infer(ctx context.Context, req *connect_go.Request[gen.InferRequest]) (*connect_go.ServerStreamForClient[gen.InferResponse], error) {
	return c.infer.CallServerStream(ctx, req)
}

// Chat calls protoflow.ProtoflowService.Chat.
func (c *protoflowServiceClient) Chat(ctx context.Context, req *connect_go.Request[gen.ChatRequest]) (*connect_go.ServerStreamForClient[gen.ChatResponse], error) {
	return c.chat.CallServerStream(ctx, req)
}

// ConvertFile calls protoflow.ProtoflowService.ConvertFile.
func (c *protoflowServiceClient) ConvertFile(ctx context.Context, req *connect_go.Request[gen.ConvertFileRequest]) (*connect_go.Response[gen.FilePath], error) {
	return c.convertFile.CallUnary(ctx, req)
}

// GenerateImages calls protoflow.ProtoflowService.GenerateImages.
func (c *protoflowServiceClient) GenerateImages(ctx context.Context, req *connect_go.Request[gen.GenerateImagesRequest]) (*connect_go.Response[gen.GenerateImagesResponse], error) {
	return c.generateImages.CallUnary(ctx, req)
}

// Register calls protoflow.ProtoflowService.Register.
func (c *protoflowServiceClient) Register(ctx context.Context, req *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error) {
	return c.register.CallUnary(ctx, req)
}

// Login calls protoflow.ProtoflowService.Login.
func (c *protoflowServiceClient) Login(ctx context.Context, req *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error) {
	return c.login.CallUnary(ctx, req)
}

// Logout calls protoflow.ProtoflowService.Logout.
func (c *protoflowServiceClient) Logout(ctx context.Context, req *connect_go.Request[gen.Empty]) (*connect_go.Response[gen.Empty], error) {
	return c.logout.CallUnary(ctx, req)
}

// ProtoflowServiceHandler is an implementation of the protoflow.ProtoflowService service.
type ProtoflowServiceHandler interface {
	DownloadYouTubeVideo(context.Context, *connect_go.Request[gen.YouTubeVideo]) (*connect_go.Response[gen.FilePath], error)
	GetSessions(context.Context, *connect_go.Request[gen.GetSessionsRequest]) (*connect_go.Response[gen.GetSessionsResponse], error)
	GetSession(context.Context, *connect_go.Request[gen.GetSessionRequest]) (*connect_go.Response[gen.GetSessionResponse], error)
	DeleteSession(context.Context, *connect_go.Request[gen.DeleteSessionRequest]) (*connect_go.Response[gen.Empty], error)
	GetPrompts(context.Context, *connect_go.Request[gen.GetPromptsRequest]) (*connect_go.Response[gen.GetPromptsResponse], error)
	NewPrompt(context.Context, *connect_go.Request[gen.Prompt]) (*connect_go.Response[gen.Prompt], error)
	UploadContent(context.Context, *connect_go.Request[gen.UploadContentRequest], *connect_go.ServerStream[gen.ChatResponse]) error
	Infer(context.Context, *connect_go.Request[gen.InferRequest], *connect_go.ServerStream[gen.InferResponse]) error
	Chat(context.Context, *connect_go.Request[gen.ChatRequest], *connect_go.ServerStream[gen.ChatResponse]) error
	ConvertFile(context.Context, *connect_go.Request[gen.ConvertFileRequest]) (*connect_go.Response[gen.FilePath], error)
	GenerateImages(context.Context, *connect_go.Request[gen.GenerateImagesRequest]) (*connect_go.Response[gen.GenerateImagesResponse], error)
	Register(context.Context, *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error)
	Login(context.Context, *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error)
	Logout(context.Context, *connect_go.Request[gen.Empty]) (*connect_go.Response[gen.Empty], error)
}

// NewProtoflowServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewProtoflowServiceHandler(svc ProtoflowServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	protoflowServiceDownloadYouTubeVideoHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceDownloadYouTubeVideoProcedure,
		svc.DownloadYouTubeVideo,
		opts...,
	)
	protoflowServiceGetSessionsHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceGetSessionsProcedure,
		svc.GetSessions,
		opts...,
	)
	protoflowServiceGetSessionHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceGetSessionProcedure,
		svc.GetSession,
		opts...,
	)
	protoflowServiceDeleteSessionHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceDeleteSessionProcedure,
		svc.DeleteSession,
		opts...,
	)
	protoflowServiceGetPromptsHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceGetPromptsProcedure,
		svc.GetPrompts,
		opts...,
	)
	protoflowServiceNewPromptHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceNewPromptProcedure,
		svc.NewPrompt,
		opts...,
	)
	protoflowServiceUploadContentHandler := connect_go.NewServerStreamHandler(
		ProtoflowServiceUploadContentProcedure,
		svc.UploadContent,
		opts...,
	)
	protoflowServiceInferHandler := connect_go.NewServerStreamHandler(
		ProtoflowServiceInferProcedure,
		svc.Infer,
		opts...,
	)
	protoflowServiceChatHandler := connect_go.NewServerStreamHandler(
		ProtoflowServiceChatProcedure,
		svc.Chat,
		opts...,
	)
	protoflowServiceConvertFileHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceConvertFileProcedure,
		svc.ConvertFile,
		opts...,
	)
	protoflowServiceGenerateImagesHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceGenerateImagesProcedure,
		svc.GenerateImages,
		opts...,
	)
	protoflowServiceRegisterHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceRegisterProcedure,
		svc.Register,
		opts...,
	)
	protoflowServiceLoginHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceLoginProcedure,
		svc.Login,
		opts...,
	)
	protoflowServiceLogoutHandler := connect_go.NewUnaryHandler(
		ProtoflowServiceLogoutProcedure,
		svc.Logout,
		opts...,
	)
	return "/protoflow.ProtoflowService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case ProtoflowServiceDownloadYouTubeVideoProcedure:
			protoflowServiceDownloadYouTubeVideoHandler.ServeHTTP(w, r)
		case ProtoflowServiceGetSessionsProcedure:
			protoflowServiceGetSessionsHandler.ServeHTTP(w, r)
		case ProtoflowServiceGetSessionProcedure:
			protoflowServiceGetSessionHandler.ServeHTTP(w, r)
		case ProtoflowServiceDeleteSessionProcedure:
			protoflowServiceDeleteSessionHandler.ServeHTTP(w, r)
		case ProtoflowServiceGetPromptsProcedure:
			protoflowServiceGetPromptsHandler.ServeHTTP(w, r)
		case ProtoflowServiceNewPromptProcedure:
			protoflowServiceNewPromptHandler.ServeHTTP(w, r)
		case ProtoflowServiceUploadContentProcedure:
			protoflowServiceUploadContentHandler.ServeHTTP(w, r)
		case ProtoflowServiceInferProcedure:
			protoflowServiceInferHandler.ServeHTTP(w, r)
		case ProtoflowServiceChatProcedure:
			protoflowServiceChatHandler.ServeHTTP(w, r)
		case ProtoflowServiceConvertFileProcedure:
			protoflowServiceConvertFileHandler.ServeHTTP(w, r)
		case ProtoflowServiceGenerateImagesProcedure:
			protoflowServiceGenerateImagesHandler.ServeHTTP(w, r)
		case ProtoflowServiceRegisterProcedure:
			protoflowServiceRegisterHandler.ServeHTTP(w, r)
		case ProtoflowServiceLoginProcedure:
			protoflowServiceLoginHandler.ServeHTTP(w, r)
		case ProtoflowServiceLogoutProcedure:
			protoflowServiceLogoutHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedProtoflowServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedProtoflowServiceHandler struct{}

func (UnimplementedProtoflowServiceHandler) DownloadYouTubeVideo(context.Context, *connect_go.Request[gen.YouTubeVideo]) (*connect_go.Response[gen.FilePath], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.DownloadYouTubeVideo is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) GetSessions(context.Context, *connect_go.Request[gen.GetSessionsRequest]) (*connect_go.Response[gen.GetSessionsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.GetSessions is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) GetSession(context.Context, *connect_go.Request[gen.GetSessionRequest]) (*connect_go.Response[gen.GetSessionResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.GetSession is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) DeleteSession(context.Context, *connect_go.Request[gen.DeleteSessionRequest]) (*connect_go.Response[gen.Empty], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.DeleteSession is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) GetPrompts(context.Context, *connect_go.Request[gen.GetPromptsRequest]) (*connect_go.Response[gen.GetPromptsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.GetPrompts is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) NewPrompt(context.Context, *connect_go.Request[gen.Prompt]) (*connect_go.Response[gen.Prompt], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.NewPrompt is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) UploadContent(context.Context, *connect_go.Request[gen.UploadContentRequest], *connect_go.ServerStream[gen.ChatResponse]) error {
	return connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.UploadContent is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) Infer(context.Context, *connect_go.Request[gen.InferRequest], *connect_go.ServerStream[gen.InferResponse]) error {
	return connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.Infer is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) Chat(context.Context, *connect_go.Request[gen.ChatRequest], *connect_go.ServerStream[gen.ChatResponse]) error {
	return connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.Chat is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) ConvertFile(context.Context, *connect_go.Request[gen.ConvertFileRequest]) (*connect_go.Response[gen.FilePath], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.ConvertFile is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) GenerateImages(context.Context, *connect_go.Request[gen.GenerateImagesRequest]) (*connect_go.Response[gen.GenerateImagesResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.GenerateImages is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) Register(context.Context, *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.Register is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) Login(context.Context, *connect_go.Request[gen.User]) (*connect_go.Response[gen.User], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.Login is not implemented"))
}

func (UnimplementedProtoflowServiceHandler) Logout(context.Context, *connect_go.Request[gen.Empty]) (*connect_go.Response[gen.Empty], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("protoflow.ProtoflowService.Logout is not implemented"))
}
