// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: content/content.proto

package content

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ContentServiceClient is the client API for ContentService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ContentServiceClient interface {
	Save(ctx context.Context, in *Contents, opts ...grpc.CallOption) (*ContentIDs, error)
	Search(ctx context.Context, in *Query, opts ...grpc.CallOption) (*Results, error)
	Relate(ctx context.Context, in *RelateRequest, opts ...grpc.CallOption) (*emptypb.Empty, error)
	Analyze(ctx context.Context, in *Content, opts ...grpc.CallOption) (*Contents, error)
	Delete(ctx context.Context, in *ContentIDs, opts ...grpc.CallOption) (*ContentIDs, error)
	GetTags(ctx context.Context, in *TagRequest, opts ...grpc.CallOption) (*Tags, error)
	SetTags(ctx context.Context, in *SetTagsRequest, opts ...grpc.CallOption) (*emptypb.Empty, error)
	Publish(ctx context.Context, in *ContentIDs, opts ...grpc.CallOption) (*ContentIDs, error)
	GetSources(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*Sources, error)
	Types(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*GRPCTypeInfo, error)
	VoiceInput(ctx context.Context, in *VoiceInputRequest, opts ...grpc.CallOption) (ContentService_VoiceInputClient, error)
}

type contentServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewContentServiceClient(cc grpc.ClientConnInterface) ContentServiceClient {
	return &contentServiceClient{cc}
}

func (c *contentServiceClient) Save(ctx context.Context, in *Contents, opts ...grpc.CallOption) (*ContentIDs, error) {
	out := new(ContentIDs)
	err := c.cc.Invoke(ctx, "/content.ContentService/Save", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) Search(ctx context.Context, in *Query, opts ...grpc.CallOption) (*Results, error) {
	out := new(Results)
	err := c.cc.Invoke(ctx, "/content.ContentService/Search", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) Relate(ctx context.Context, in *RelateRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/content.ContentService/Relate", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) Analyze(ctx context.Context, in *Content, opts ...grpc.CallOption) (*Contents, error) {
	out := new(Contents)
	err := c.cc.Invoke(ctx, "/content.ContentService/Analyze", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) Delete(ctx context.Context, in *ContentIDs, opts ...grpc.CallOption) (*ContentIDs, error) {
	out := new(ContentIDs)
	err := c.cc.Invoke(ctx, "/content.ContentService/Delete", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) GetTags(ctx context.Context, in *TagRequest, opts ...grpc.CallOption) (*Tags, error) {
	out := new(Tags)
	err := c.cc.Invoke(ctx, "/content.ContentService/GetTags", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) SetTags(ctx context.Context, in *SetTagsRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/content.ContentService/SetTags", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) Publish(ctx context.Context, in *ContentIDs, opts ...grpc.CallOption) (*ContentIDs, error) {
	out := new(ContentIDs)
	err := c.cc.Invoke(ctx, "/content.ContentService/Publish", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) GetSources(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*Sources, error) {
	out := new(Sources)
	err := c.cc.Invoke(ctx, "/content.ContentService/GetSources", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) Types(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*GRPCTypeInfo, error) {
	out := new(GRPCTypeInfo)
	err := c.cc.Invoke(ctx, "/content.ContentService/Types", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *contentServiceClient) VoiceInput(ctx context.Context, in *VoiceInputRequest, opts ...grpc.CallOption) (ContentService_VoiceInputClient, error) {
	stream, err := c.cc.NewStream(ctx, &ContentService_ServiceDesc.Streams[0], "/content.ContentService/VoiceInput", opts...)
	if err != nil {
		return nil, err
	}
	x := &contentServiceVoiceInputClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type ContentService_VoiceInputClient interface {
	Recv() (*VoiceInputResponse, error)
	grpc.ClientStream
}

type contentServiceVoiceInputClient struct {
	grpc.ClientStream
}

func (x *contentServiceVoiceInputClient) Recv() (*VoiceInputResponse, error) {
	m := new(VoiceInputResponse)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// ContentServiceServer is the server API for ContentService service.
// All implementations should embed UnimplementedContentServiceServer
// for forward compatibility
type ContentServiceServer interface {
	Save(context.Context, *Contents) (*ContentIDs, error)
	Search(context.Context, *Query) (*Results, error)
	Relate(context.Context, *RelateRequest) (*emptypb.Empty, error)
	Analyze(context.Context, *Content) (*Contents, error)
	Delete(context.Context, *ContentIDs) (*ContentIDs, error)
	GetTags(context.Context, *TagRequest) (*Tags, error)
	SetTags(context.Context, *SetTagsRequest) (*emptypb.Empty, error)
	Publish(context.Context, *ContentIDs) (*ContentIDs, error)
	GetSources(context.Context, *emptypb.Empty) (*Sources, error)
	Types(context.Context, *emptypb.Empty) (*GRPCTypeInfo, error)
	VoiceInput(*VoiceInputRequest, ContentService_VoiceInputServer) error
}

// UnimplementedContentServiceServer should be embedded to have forward compatible implementations.
type UnimplementedContentServiceServer struct {
}

func (UnimplementedContentServiceServer) Save(context.Context, *Contents) (*ContentIDs, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Save not implemented")
}
func (UnimplementedContentServiceServer) Search(context.Context, *Query) (*Results, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Search not implemented")
}
func (UnimplementedContentServiceServer) Relate(context.Context, *RelateRequest) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Relate not implemented")
}
func (UnimplementedContentServiceServer) Analyze(context.Context, *Content) (*Contents, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Analyze not implemented")
}
func (UnimplementedContentServiceServer) Delete(context.Context, *ContentIDs) (*ContentIDs, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Delete not implemented")
}
func (UnimplementedContentServiceServer) GetTags(context.Context, *TagRequest) (*Tags, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTags not implemented")
}
func (UnimplementedContentServiceServer) SetTags(context.Context, *SetTagsRequest) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SetTags not implemented")
}
func (UnimplementedContentServiceServer) Publish(context.Context, *ContentIDs) (*ContentIDs, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Publish not implemented")
}
func (UnimplementedContentServiceServer) GetSources(context.Context, *emptypb.Empty) (*Sources, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetSources not implemented")
}
func (UnimplementedContentServiceServer) Types(context.Context, *emptypb.Empty) (*GRPCTypeInfo, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Types not implemented")
}
func (UnimplementedContentServiceServer) VoiceInput(*VoiceInputRequest, ContentService_VoiceInputServer) error {
	return status.Errorf(codes.Unimplemented, "method VoiceInput not implemented")
}

// UnsafeContentServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ContentServiceServer will
// result in compilation errors.
type UnsafeContentServiceServer interface {
	mustEmbedUnimplementedContentServiceServer()
}

func RegisterContentServiceServer(s grpc.ServiceRegistrar, srv ContentServiceServer) {
	s.RegisterService(&ContentService_ServiceDesc, srv)
}

func _ContentService_Save_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Contents)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).Save(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/Save",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).Save(ctx, req.(*Contents))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_Search_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Query)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).Search(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/Search",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).Search(ctx, req.(*Query))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_Relate_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RelateRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).Relate(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/Relate",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).Relate(ctx, req.(*RelateRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_Analyze_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Content)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).Analyze(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/Analyze",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).Analyze(ctx, req.(*Content))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_Delete_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ContentIDs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).Delete(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/Delete",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).Delete(ctx, req.(*ContentIDs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_GetTags_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TagRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).GetTags(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/GetTags",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).GetTags(ctx, req.(*TagRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_SetTags_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetTagsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).SetTags(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/SetTags",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).SetTags(ctx, req.(*SetTagsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_Publish_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ContentIDs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).Publish(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/Publish",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).Publish(ctx, req.(*ContentIDs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_GetSources_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).GetSources(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/GetSources",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).GetSources(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_Types_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ContentServiceServer).Types(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/content.ContentService/Types",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ContentServiceServer).Types(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _ContentService_VoiceInput_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(VoiceInputRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(ContentServiceServer).VoiceInput(m, &contentServiceVoiceInputServer{stream})
}

type ContentService_VoiceInputServer interface {
	Send(*VoiceInputResponse) error
	grpc.ServerStream
}

type contentServiceVoiceInputServer struct {
	grpc.ServerStream
}

func (x *contentServiceVoiceInputServer) Send(m *VoiceInputResponse) error {
	return x.ServerStream.SendMsg(m)
}

// ContentService_ServiceDesc is the grpc.ServiceDesc for ContentService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ContentService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "content.ContentService",
	HandlerType: (*ContentServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Save",
			Handler:    _ContentService_Save_Handler,
		},
		{
			MethodName: "Search",
			Handler:    _ContentService_Search_Handler,
		},
		{
			MethodName: "Relate",
			Handler:    _ContentService_Relate_Handler,
		},
		{
			MethodName: "Analyze",
			Handler:    _ContentService_Analyze_Handler,
		},
		{
			MethodName: "Delete",
			Handler:    _ContentService_Delete_Handler,
		},
		{
			MethodName: "GetTags",
			Handler:    _ContentService_GetTags_Handler,
		},
		{
			MethodName: "SetTags",
			Handler:    _ContentService_SetTags_Handler,
		},
		{
			MethodName: "Publish",
			Handler:    _ContentService_Publish_Handler,
		},
		{
			MethodName: "GetSources",
			Handler:    _ContentService_GetSources_Handler,
		},
		{
			MethodName: "Types",
			Handler:    _ContentService_Types_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "VoiceInput",
			Handler:       _ContentService_VoiceInput_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "content/content.proto",
}
