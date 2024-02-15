// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: kubes/kubes.proto

package kubesconnect

import (
	context "context"
	errors "errors"
	connect_go "github.com/bufbuild/connect-go"
	kubes "github.com/justshare-io/justshare/pkg/gen/kubes"
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
	// KubesServiceName is the fully-qualified name of the KubesService service.
	KubesServiceName = "kubes.KubesService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// KubesServiceListDeploymentsProcedure is the fully-qualified name of the KubesService's
	// ListDeployments RPC.
	KubesServiceListDeploymentsProcedure = "/kubes.KubesService/ListDeployments"
	// KubesServiceNewDeploymentProcedure is the fully-qualified name of the KubesService's
	// NewDeployment RPC.
	KubesServiceNewDeploymentProcedure = "/kubes.KubesService/NewDeployment"
	// KubesServiceDeleteDeploymentProcedure is the fully-qualified name of the KubesService's
	// DeleteDeployment RPC.
	KubesServiceDeleteDeploymentProcedure = "/kubes.KubesService/DeleteDeployment"
	// KubesServiceNewIngressProcedure is the fully-qualified name of the KubesService's NewIngress RPC.
	KubesServiceNewIngressProcedure = "/kubes.KubesService/NewIngress"
	// KubesServiceUpdateDeploymentProcedure is the fully-qualified name of the KubesService's
	// UpdateDeployment RPC.
	KubesServiceUpdateDeploymentProcedure = "/kubes.KubesService/UpdateDeployment"
	// KubesServiceBuildImageProcedure is the fully-qualified name of the KubesService's BuildImage RPC.
	KubesServiceBuildImageProcedure = "/kubes.KubesService/BuildImage"
)

// KubesServiceClient is a client for the kubes.KubesService service.
type KubesServiceClient interface {
	ListDeployments(context.Context, *connect_go.Request[kubes.ListDeploymentsRequest]) (*connect_go.Response[kubes.ListDeploymentsResponse], error)
	NewDeployment(context.Context, *connect_go.Request[kubes.NewDeploymentRequest]) (*connect_go.Response[kubes.NewDeploymentResponse], error)
	DeleteDeployment(context.Context, *connect_go.Request[kubes.DeleteDeploymentRequest]) (*connect_go.Response[kubes.DeleteDeploymentResponse], error)
	NewIngress(context.Context, *connect_go.Request[kubes.NewIngressRequest]) (*connect_go.Response[kubes.NewIngressResponse], error)
	UpdateDeployment(context.Context, *connect_go.Request[kubes.UpdateDeploymentRequest]) (*connect_go.Response[kubes.UpdateDeploymentResponse], error)
	BuildImage(context.Context, *connect_go.Request[kubes.BuildImageRequest]) (*connect_go.Response[kubes.BuildImageResponse], error)
}

// NewKubesServiceClient constructs a client for the kubes.KubesService service. By default, it uses
// the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and sends
// uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or
// connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewKubesServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) KubesServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &kubesServiceClient{
		listDeployments: connect_go.NewClient[kubes.ListDeploymentsRequest, kubes.ListDeploymentsResponse](
			httpClient,
			baseURL+KubesServiceListDeploymentsProcedure,
			opts...,
		),
		newDeployment: connect_go.NewClient[kubes.NewDeploymentRequest, kubes.NewDeploymentResponse](
			httpClient,
			baseURL+KubesServiceNewDeploymentProcedure,
			opts...,
		),
		deleteDeployment: connect_go.NewClient[kubes.DeleteDeploymentRequest, kubes.DeleteDeploymentResponse](
			httpClient,
			baseURL+KubesServiceDeleteDeploymentProcedure,
			opts...,
		),
		newIngress: connect_go.NewClient[kubes.NewIngressRequest, kubes.NewIngressResponse](
			httpClient,
			baseURL+KubesServiceNewIngressProcedure,
			opts...,
		),
		updateDeployment: connect_go.NewClient[kubes.UpdateDeploymentRequest, kubes.UpdateDeploymentResponse](
			httpClient,
			baseURL+KubesServiceUpdateDeploymentProcedure,
			opts...,
		),
		buildImage: connect_go.NewClient[kubes.BuildImageRequest, kubes.BuildImageResponse](
			httpClient,
			baseURL+KubesServiceBuildImageProcedure,
			opts...,
		),
	}
}

// kubesServiceClient implements KubesServiceClient.
type kubesServiceClient struct {
	listDeployments  *connect_go.Client[kubes.ListDeploymentsRequest, kubes.ListDeploymentsResponse]
	newDeployment    *connect_go.Client[kubes.NewDeploymentRequest, kubes.NewDeploymentResponse]
	deleteDeployment *connect_go.Client[kubes.DeleteDeploymentRequest, kubes.DeleteDeploymentResponse]
	newIngress       *connect_go.Client[kubes.NewIngressRequest, kubes.NewIngressResponse]
	updateDeployment *connect_go.Client[kubes.UpdateDeploymentRequest, kubes.UpdateDeploymentResponse]
	buildImage       *connect_go.Client[kubes.BuildImageRequest, kubes.BuildImageResponse]
}

// ListDeployments calls kubes.KubesService.ListDeployments.
func (c *kubesServiceClient) ListDeployments(ctx context.Context, req *connect_go.Request[kubes.ListDeploymentsRequest]) (*connect_go.Response[kubes.ListDeploymentsResponse], error) {
	return c.listDeployments.CallUnary(ctx, req)
}

// NewDeployment calls kubes.KubesService.NewDeployment.
func (c *kubesServiceClient) NewDeployment(ctx context.Context, req *connect_go.Request[kubes.NewDeploymentRequest]) (*connect_go.Response[kubes.NewDeploymentResponse], error) {
	return c.newDeployment.CallUnary(ctx, req)
}

// DeleteDeployment calls kubes.KubesService.DeleteDeployment.
func (c *kubesServiceClient) DeleteDeployment(ctx context.Context, req *connect_go.Request[kubes.DeleteDeploymentRequest]) (*connect_go.Response[kubes.DeleteDeploymentResponse], error) {
	return c.deleteDeployment.CallUnary(ctx, req)
}

// NewIngress calls kubes.KubesService.NewIngress.
func (c *kubesServiceClient) NewIngress(ctx context.Context, req *connect_go.Request[kubes.NewIngressRequest]) (*connect_go.Response[kubes.NewIngressResponse], error) {
	return c.newIngress.CallUnary(ctx, req)
}

// UpdateDeployment calls kubes.KubesService.UpdateDeployment.
func (c *kubesServiceClient) UpdateDeployment(ctx context.Context, req *connect_go.Request[kubes.UpdateDeploymentRequest]) (*connect_go.Response[kubes.UpdateDeploymentResponse], error) {
	return c.updateDeployment.CallUnary(ctx, req)
}

// BuildImage calls kubes.KubesService.BuildImage.
func (c *kubesServiceClient) BuildImage(ctx context.Context, req *connect_go.Request[kubes.BuildImageRequest]) (*connect_go.Response[kubes.BuildImageResponse], error) {
	return c.buildImage.CallUnary(ctx, req)
}

// KubesServiceHandler is an implementation of the kubes.KubesService service.
type KubesServiceHandler interface {
	ListDeployments(context.Context, *connect_go.Request[kubes.ListDeploymentsRequest]) (*connect_go.Response[kubes.ListDeploymentsResponse], error)
	NewDeployment(context.Context, *connect_go.Request[kubes.NewDeploymentRequest]) (*connect_go.Response[kubes.NewDeploymentResponse], error)
	DeleteDeployment(context.Context, *connect_go.Request[kubes.DeleteDeploymentRequest]) (*connect_go.Response[kubes.DeleteDeploymentResponse], error)
	NewIngress(context.Context, *connect_go.Request[kubes.NewIngressRequest]) (*connect_go.Response[kubes.NewIngressResponse], error)
	UpdateDeployment(context.Context, *connect_go.Request[kubes.UpdateDeploymentRequest]) (*connect_go.Response[kubes.UpdateDeploymentResponse], error)
	BuildImage(context.Context, *connect_go.Request[kubes.BuildImageRequest]) (*connect_go.Response[kubes.BuildImageResponse], error)
}

// NewKubesServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewKubesServiceHandler(svc KubesServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	kubesServiceListDeploymentsHandler := connect_go.NewUnaryHandler(
		KubesServiceListDeploymentsProcedure,
		svc.ListDeployments,
		opts...,
	)
	kubesServiceNewDeploymentHandler := connect_go.NewUnaryHandler(
		KubesServiceNewDeploymentProcedure,
		svc.NewDeployment,
		opts...,
	)
	kubesServiceDeleteDeploymentHandler := connect_go.NewUnaryHandler(
		KubesServiceDeleteDeploymentProcedure,
		svc.DeleteDeployment,
		opts...,
	)
	kubesServiceNewIngressHandler := connect_go.NewUnaryHandler(
		KubesServiceNewIngressProcedure,
		svc.NewIngress,
		opts...,
	)
	kubesServiceUpdateDeploymentHandler := connect_go.NewUnaryHandler(
		KubesServiceUpdateDeploymentProcedure,
		svc.UpdateDeployment,
		opts...,
	)
	kubesServiceBuildImageHandler := connect_go.NewUnaryHandler(
		KubesServiceBuildImageProcedure,
		svc.BuildImage,
		opts...,
	)
	return "/kubes.KubesService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case KubesServiceListDeploymentsProcedure:
			kubesServiceListDeploymentsHandler.ServeHTTP(w, r)
		case KubesServiceNewDeploymentProcedure:
			kubesServiceNewDeploymentHandler.ServeHTTP(w, r)
		case KubesServiceDeleteDeploymentProcedure:
			kubesServiceDeleteDeploymentHandler.ServeHTTP(w, r)
		case KubesServiceNewIngressProcedure:
			kubesServiceNewIngressHandler.ServeHTTP(w, r)
		case KubesServiceUpdateDeploymentProcedure:
			kubesServiceUpdateDeploymentHandler.ServeHTTP(w, r)
		case KubesServiceBuildImageProcedure:
			kubesServiceBuildImageHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedKubesServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedKubesServiceHandler struct{}

func (UnimplementedKubesServiceHandler) ListDeployments(context.Context, *connect_go.Request[kubes.ListDeploymentsRequest]) (*connect_go.Response[kubes.ListDeploymentsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("kubes.KubesService.ListDeployments is not implemented"))
}

func (UnimplementedKubesServiceHandler) NewDeployment(context.Context, *connect_go.Request[kubes.NewDeploymentRequest]) (*connect_go.Response[kubes.NewDeploymentResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("kubes.KubesService.NewDeployment is not implemented"))
}

func (UnimplementedKubesServiceHandler) DeleteDeployment(context.Context, *connect_go.Request[kubes.DeleteDeploymentRequest]) (*connect_go.Response[kubes.DeleteDeploymentResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("kubes.KubesService.DeleteDeployment is not implemented"))
}

func (UnimplementedKubesServiceHandler) NewIngress(context.Context, *connect_go.Request[kubes.NewIngressRequest]) (*connect_go.Response[kubes.NewIngressResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("kubes.KubesService.NewIngress is not implemented"))
}

func (UnimplementedKubesServiceHandler) UpdateDeployment(context.Context, *connect_go.Request[kubes.UpdateDeploymentRequest]) (*connect_go.Response[kubes.UpdateDeploymentResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("kubes.KubesService.UpdateDeployment is not implemented"))
}

func (UnimplementedKubesServiceHandler) BuildImage(context.Context, *connect_go.Request[kubes.BuildImageRequest]) (*connect_go.Response[kubes.BuildImageResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("kubes.KubesService.BuildImage is not implemented"))
}
