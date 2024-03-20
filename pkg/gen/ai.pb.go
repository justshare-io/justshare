// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        (unknown)
// source: ai.proto

package gen

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type AnalyzeConversationResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Phone numbers of the participants
	PhoneNumbers []string `protobuf:"bytes,1,rep,name=phone_numbers,json=phoneNumbers,proto3" json:"phone_numbers,omitempty"`
	// The summary of the conversation
	Summary string `protobuf:"bytes,2,opt,name=summary,proto3" json:"summary,omitempty"`
	// Based on the content of the conversation, the system will generate a list of questions
	Questions []string `protobuf:"bytes,3,rep,name=questions,proto3" json:"questions,omitempty"`
}

func (x *AnalyzeConversationResponse) Reset() {
	*x = AnalyzeConversationResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ai_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AnalyzeConversationResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AnalyzeConversationResponse) ProtoMessage() {}

func (x *AnalyzeConversationResponse) ProtoReflect() protoreflect.Message {
	mi := &file_ai_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AnalyzeConversationResponse.ProtoReflect.Descriptor instead.
func (*AnalyzeConversationResponse) Descriptor() ([]byte, []int) {
	return file_ai_proto_rawDescGZIP(), []int{0}
}

func (x *AnalyzeConversationResponse) GetPhoneNumbers() []string {
	if x != nil {
		return x.PhoneNumbers
	}
	return nil
}

func (x *AnalyzeConversationResponse) GetSummary() string {
	if x != nil {
		return x.Summary
	}
	return ""
}

func (x *AnalyzeConversationResponse) GetQuestions() []string {
	if x != nil {
		return x.Questions
	}
	return nil
}

type AnalyzeContent struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Potential categories for the content in the form: category/subcategory/other-category. The category is all lowercase and spaces are replaced with dashes.
	Categories []string `protobuf:"bytes,1,rep,name=categories,proto3" json:"categories,omitempty"`
}

func (x *AnalyzeContent) Reset() {
	*x = AnalyzeContent{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ai_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AnalyzeContent) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AnalyzeContent) ProtoMessage() {}

func (x *AnalyzeContent) ProtoReflect() protoreflect.Message {
	mi := &file_ai_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AnalyzeContent.ProtoReflect.Descriptor instead.
func (*AnalyzeContent) Descriptor() ([]byte, []int) {
	return file_ai_proto_rawDescGZIP(), []int{1}
}

func (x *AnalyzeContent) GetCategories() []string {
	if x != nil {
		return x.Categories
	}
	return nil
}

var File_ai_proto protoreflect.FileDescriptor

var file_ai_proto_rawDesc = []byte{
	0x0a, 0x08, 0x61, 0x69, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x02, 0x61, 0x69, 0x22, 0x7a,
	0x0a, 0x1b, 0x41, 0x6e, 0x61, 0x6c, 0x79, 0x7a, 0x65, 0x43, 0x6f, 0x6e, 0x76, 0x65, 0x72, 0x73,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x23, 0x0a,
	0x0d, 0x70, 0x68, 0x6f, 0x6e, 0x65, 0x5f, 0x6e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x73, 0x18, 0x01,
	0x20, 0x03, 0x28, 0x09, 0x52, 0x0c, 0x70, 0x68, 0x6f, 0x6e, 0x65, 0x4e, 0x75, 0x6d, 0x62, 0x65,
	0x72, 0x73, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x75, 0x6d, 0x6d, 0x61, 0x72, 0x79, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x07, 0x73, 0x75, 0x6d, 0x6d, 0x61, 0x72, 0x79, 0x12, 0x1c, 0x0a, 0x09,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x09, 0x52,
	0x09, 0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x22, 0x30, 0x0a, 0x0e, 0x41, 0x6e,
	0x61, 0x6c, 0x79, 0x7a, 0x65, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x12, 0x1e, 0x0a, 0x0a,
	0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x09,
	0x52, 0x0a, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73, 0x42, 0x64, 0x0a, 0x06,
	0x63, 0x6f, 0x6d, 0x2e, 0x61, 0x69, 0x42, 0x07, 0x41, 0x69, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50,
	0x01, 0x5a, 0x29, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6a, 0x75,
	0x73, 0x74, 0x73, 0x68, 0x61, 0x72, 0x65, 0x2d, 0x69, 0x6f, 0x2f, 0x6a, 0x75, 0x73, 0x74, 0x73,
	0x68, 0x61, 0x72, 0x65, 0x2f, 0x70, 0x6b, 0x67, 0x2f, 0x67, 0x65, 0x6e, 0xa2, 0x02, 0x03, 0x41,
	0x58, 0x58, 0xaa, 0x02, 0x02, 0x41, 0x69, 0xca, 0x02, 0x02, 0x41, 0x69, 0xe2, 0x02, 0x0e, 0x41,
	0x69, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x02,
	0x41, 0x69, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_ai_proto_rawDescOnce sync.Once
	file_ai_proto_rawDescData = file_ai_proto_rawDesc
)

func file_ai_proto_rawDescGZIP() []byte {
	file_ai_proto_rawDescOnce.Do(func() {
		file_ai_proto_rawDescData = protoimpl.X.CompressGZIP(file_ai_proto_rawDescData)
	})
	return file_ai_proto_rawDescData
}

var file_ai_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_ai_proto_goTypes = []interface{}{
	(*AnalyzeConversationResponse)(nil), // 0: ai.AnalyzeConversationResponse
	(*AnalyzeContent)(nil),              // 1: ai.AnalyzeContent
}
var file_ai_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_ai_proto_init() }
func file_ai_proto_init() {
	if File_ai_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_ai_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AnalyzeConversationResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ai_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AnalyzeContent); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_ai_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_ai_proto_goTypes,
		DependencyIndexes: file_ai_proto_depIdxs,
		MessageInfos:      file_ai_proto_msgTypes,
	}.Build()
	File_ai_proto = out.File
	file_ai_proto_rawDesc = nil
	file_ai_proto_goTypes = nil
	file_ai_proto_depIdxs = nil
}
