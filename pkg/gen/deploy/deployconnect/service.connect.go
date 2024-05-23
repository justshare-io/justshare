// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: deploy/service.proto

package deployconnect

import (
	context "context"
	errors "errors"
	connect_go "github.com/bufbuild/connect-go"
	deploy "github.com/justshare-io/justshare/pkg/gen/deploy"
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
	// DeployServiceName is the fully-qualified name of the DeployService service.
	DeployServiceName = "deploy.DeployService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// DeployServiceDeployProcedure is the fully-qualified name of the DeployService's Deploy RPC.
	DeployServiceDeployProcedure = "/deploy.DeployService/Deploy"
)

// DeployServiceClient is a client for the deploy.DeployService service.
type DeployServiceClient interface {
	Deploy(context.Context, *connect_go.Request[deploy.DeployRequest]) (*connect_go.Response[deploy.DeployResponse], error)
}

// NewDeployServiceClient constructs a client for the deploy.DeployService service. By default, it
// uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and sends
// uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or
// connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewDeployServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) DeployServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &deployServiceClient{
		deploy: connect_go.NewClient[deploy.DeployRequest, deploy.DeployResponse](
			httpClient,
			baseURL+DeployServiceDeployProcedure,
			opts...,
		),
	}
}

// deployServiceClient implements DeployServiceClient.
type deployServiceClient struct {
	deploy *connect_go.Client[deploy.DeployRequest, deploy.DeployResponse]
}

// Deploy calls deploy.DeployService.Deploy.
func (c *deployServiceClient) Deploy(ctx context.Context, req *connect_go.Request[deploy.DeployRequest]) (*connect_go.Response[deploy.DeployResponse], error) {
	return c.deploy.CallUnary(ctx, req)
}

// DeployServiceHandler is an implementation of the deploy.DeployService service.
type DeployServiceHandler interface {
	Deploy(context.Context, *connect_go.Request[deploy.DeployRequest]) (*connect_go.Response[deploy.DeployResponse], error)
}

// NewDeployServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewDeployServiceHandler(svc DeployServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	deployServiceDeployHandler := connect_go.NewUnaryHandler(
		DeployServiceDeployProcedure,
		svc.Deploy,
		opts...,
	)
	return "/deploy.DeployService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case DeployServiceDeployProcedure:
			deployServiceDeployHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedDeployServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedDeployServiceHandler struct{}

func (UnimplementedDeployServiceHandler) Deploy(context.Context, *connect_go.Request[deploy.DeployRequest]) (*connect_go.Response[deploy.DeployResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("deploy.DeployService.Deploy is not implemented"))
}
