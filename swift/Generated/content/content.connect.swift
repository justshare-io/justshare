// Code generated by protoc-gen-connect-swift. DO NOT EDIT.
//
// Source: content/content.proto
//

import Connect
import Foundation
import SwiftProtobuf

public protocol Content_ContentServiceClientInterface: Sendable {

    @discardableResult
    func `save`(request: Content_Contents, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_ContentIDs>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `save`(request: Content_Contents, headers: Connect.Headers) async -> ResponseMessage<Content_ContentIDs>

    @discardableResult
    func `search`(request: Content_Query, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_Results>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `search`(request: Content_Query, headers: Connect.Headers) async -> ResponseMessage<Content_Results>

    @discardableResult
    func `relate`(request: Content_RelateRequest, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `relate`(request: Content_RelateRequest, headers: Connect.Headers) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>

    @discardableResult
    func `analyze`(request: Content_Content, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_Contents>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `analyze`(request: Content_Content, headers: Connect.Headers) async -> ResponseMessage<Content_Contents>

    @discardableResult
    func `delete`(request: Content_ContentIDs, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_ContentIDs>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `delete`(request: Content_ContentIDs, headers: Connect.Headers) async -> ResponseMessage<Content_ContentIDs>

    @discardableResult
    func `getTags`(request: Content_TagRequest, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_Tags>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `getTags`(request: Content_TagRequest, headers: Connect.Headers) async -> ResponseMessage<Content_Tags>

    @discardableResult
    func `setTags`(request: Content_SetTagsRequest, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `setTags`(request: Content_SetTagsRequest, headers: Connect.Headers) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>

    @discardableResult
    func `publish`(request: Content_ContentIDs, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_ContentIDs>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `publish`(request: Content_ContentIDs, headers: Connect.Headers) async -> ResponseMessage<Content_ContentIDs>

    @discardableResult
    func `getSources`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_Sources>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `getSources`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers) async -> ResponseMessage<Content_Sources>

    @discardableResult
    func `types`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Content_GRPCTypeInfo>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `types`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers) async -> ResponseMessage<Content_GRPCTypeInfo>
}

/// Concrete implementation of `Content_ContentServiceClientInterface`.
public final class Content_ContentServiceClient: Content_ContentServiceClientInterface, Sendable {
    private let client: Connect.ProtocolClientInterface

    public init(client: Connect.ProtocolClientInterface) {
        self.client = client
    }

    @discardableResult
    public func `save`(request: Content_Contents, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_ContentIDs>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/Save", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `save`(request: Content_Contents, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_ContentIDs> {
        return await self.client.unary(path: "/content.ContentService/Save", request: request, headers: headers)
    }

    @discardableResult
    public func `search`(request: Content_Query, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_Results>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/Search", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `search`(request: Content_Query, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_Results> {
        return await self.client.unary(path: "/content.ContentService/Search", request: request, headers: headers)
    }

    @discardableResult
    public func `relate`(request: Content_RelateRequest, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/Relate", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `relate`(request: Content_RelateRequest, headers: Connect.Headers = [:]) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty> {
        return await self.client.unary(path: "/content.ContentService/Relate", request: request, headers: headers)
    }

    @discardableResult
    public func `analyze`(request: Content_Content, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_Contents>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/Analyze", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `analyze`(request: Content_Content, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_Contents> {
        return await self.client.unary(path: "/content.ContentService/Analyze", request: request, headers: headers)
    }

    @discardableResult
    public func `delete`(request: Content_ContentIDs, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_ContentIDs>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/Delete", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `delete`(request: Content_ContentIDs, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_ContentIDs> {
        return await self.client.unary(path: "/content.ContentService/Delete", request: request, headers: headers)
    }

    @discardableResult
    public func `getTags`(request: Content_TagRequest, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_Tags>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/GetTags", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `getTags`(request: Content_TagRequest, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_Tags> {
        return await self.client.unary(path: "/content.ContentService/GetTags", request: request, headers: headers)
    }

    @discardableResult
    public func `setTags`(request: Content_SetTagsRequest, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/SetTags", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `setTags`(request: Content_SetTagsRequest, headers: Connect.Headers = [:]) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty> {
        return await self.client.unary(path: "/content.ContentService/SetTags", request: request, headers: headers)
    }

    @discardableResult
    public func `publish`(request: Content_ContentIDs, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_ContentIDs>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/Publish", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `publish`(request: Content_ContentIDs, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_ContentIDs> {
        return await self.client.unary(path: "/content.ContentService/Publish", request: request, headers: headers)
    }

    @discardableResult
    public func `getSources`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_Sources>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/GetSources", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `getSources`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_Sources> {
        return await self.client.unary(path: "/content.ContentService/GetSources", request: request, headers: headers)
    }

    @discardableResult
    public func `types`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Content_GRPCTypeInfo>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/content.ContentService/Types", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `types`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:]) async -> ResponseMessage<Content_GRPCTypeInfo> {
        return await self.client.unary(path: "/content.ContentService/Types", request: request, headers: headers)
    }

    public enum Metadata {
        public enum Methods {
            public static let save = Connect.MethodSpec(name: "Save", service: "content.ContentService", type: .unary)
            public static let search = Connect.MethodSpec(name: "Search", service: "content.ContentService", type: .unary)
            public static let relate = Connect.MethodSpec(name: "Relate", service: "content.ContentService", type: .unary)
            public static let analyze = Connect.MethodSpec(name: "Analyze", service: "content.ContentService", type: .unary)
            public static let delete = Connect.MethodSpec(name: "Delete", service: "content.ContentService", type: .unary)
            public static let getTags = Connect.MethodSpec(name: "GetTags", service: "content.ContentService", type: .unary)
            public static let setTags = Connect.MethodSpec(name: "SetTags", service: "content.ContentService", type: .unary)
            public static let publish = Connect.MethodSpec(name: "Publish", service: "content.ContentService", type: .unary)
            public static let getSources = Connect.MethodSpec(name: "GetSources", service: "content.ContentService", type: .unary)
            public static let types = Connect.MethodSpec(name: "Types", service: "content.ContentService", type: .unary)
        }
    }
}
