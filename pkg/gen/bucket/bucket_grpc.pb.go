// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: bucket/bucket.proto

package bucket

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// BucketServiceClient is the client API for BucketService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type BucketServiceClient interface {
	SignedURL(ctx context.Context, in *SignedURLRequest, opts ...grpc.CallOption) (*SignedURLResponse, error)
	Readdir(ctx context.Context, in *ReaddirRequest, opts ...grpc.CallOption) (*ReaddirResponse, error)
	Remove(ctx context.Context, in *RemoveRequest, opts ...grpc.CallOption) (*RemoveResponse, error)
}

type bucketServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewBucketServiceClient(cc grpc.ClientConnInterface) BucketServiceClient {
	return &bucketServiceClient{cc}
}

func (c *bucketServiceClient) SignedURL(ctx context.Context, in *SignedURLRequest, opts ...grpc.CallOption) (*SignedURLResponse, error) {
	out := new(SignedURLResponse)
	err := c.cc.Invoke(ctx, "/bucket.BucketService/SignedURL", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *bucketServiceClient) Readdir(ctx context.Context, in *ReaddirRequest, opts ...grpc.CallOption) (*ReaddirResponse, error) {
	out := new(ReaddirResponse)
	err := c.cc.Invoke(ctx, "/bucket.BucketService/Readdir", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *bucketServiceClient) Remove(ctx context.Context, in *RemoveRequest, opts ...grpc.CallOption) (*RemoveResponse, error) {
	out := new(RemoveResponse)
	err := c.cc.Invoke(ctx, "/bucket.BucketService/Remove", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// BucketServiceServer is the server API for BucketService service.
// All implementations should embed UnimplementedBucketServiceServer
// for forward compatibility
type BucketServiceServer interface {
	SignedURL(context.Context, *SignedURLRequest) (*SignedURLResponse, error)
	Readdir(context.Context, *ReaddirRequest) (*ReaddirResponse, error)
	Remove(context.Context, *RemoveRequest) (*RemoveResponse, error)
}

// UnimplementedBucketServiceServer should be embedded to have forward compatible implementations.
type UnimplementedBucketServiceServer struct {
}

func (UnimplementedBucketServiceServer) SignedURL(context.Context, *SignedURLRequest) (*SignedURLResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignedURL not implemented")
}
func (UnimplementedBucketServiceServer) Readdir(context.Context, *ReaddirRequest) (*ReaddirResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Readdir not implemented")
}
func (UnimplementedBucketServiceServer) Remove(context.Context, *RemoveRequest) (*RemoveResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Remove not implemented")
}

// UnsafeBucketServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to BucketServiceServer will
// result in compilation errors.
type UnsafeBucketServiceServer interface {
	mustEmbedUnimplementedBucketServiceServer()
}

func RegisterBucketServiceServer(s grpc.ServiceRegistrar, srv BucketServiceServer) {
	s.RegisterService(&BucketService_ServiceDesc, srv)
}

func _BucketService_SignedURL_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignedURLRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(BucketServiceServer).SignedURL(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bucket.BucketService/SignedURL",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(BucketServiceServer).SignedURL(ctx, req.(*SignedURLRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _BucketService_Readdir_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ReaddirRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(BucketServiceServer).Readdir(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bucket.BucketService/Readdir",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(BucketServiceServer).Readdir(ctx, req.(*ReaddirRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _BucketService_Remove_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RemoveRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(BucketServiceServer).Remove(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bucket.BucketService/Remove",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(BucketServiceServer).Remove(ctx, req.(*RemoveRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// BucketService_ServiceDesc is the grpc.ServiceDesc for BucketService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var BucketService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bucket.BucketService",
	HandlerType: (*BucketServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SignedURL",
			Handler:    _BucketService_SignedURL_Handler,
		},
		{
			MethodName: "Readdir",
			Handler:    _BucketService_Readdir_Handler,
		},
		{
			MethodName: "Remove",
			Handler:    _BucketService_Remove_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "bucket/bucket.proto",
}
