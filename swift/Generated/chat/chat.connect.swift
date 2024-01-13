// Code generated by protoc-gen-connect-swift. DO NOT EDIT.
//
// Source: chat/chat.proto
//

import Connect
import Foundation
import SwiftProtobuf

public protocol Chat_ChatServiceClientInterface: Sendable {

    @discardableResult
    func `sendMessage`(request: Chat_SendMessageRequest, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Chat_SendMessageResponse>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `sendMessage`(request: Chat_SendMessageRequest, headers: Connect.Headers) async -> ResponseMessage<Chat_SendMessageResponse>

    func `receiveMessages`(headers: Connect.Headers, onResult: @escaping @Sendable (Connect.StreamResult<Chat_Message>) -> Void) -> any Connect.ServerOnlyStreamInterface<Chat_ReceiveMessagesRequest>

    @available(iOS 13, *)
    func `receiveMessages`(headers: Connect.Headers) -> any Connect.ServerOnlyAsyncStreamInterface<Chat_ReceiveMessagesRequest, Chat_Message>

    @discardableResult
    func `banUser`(request: Chat_BanUserRequest, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<Chat_BanUserResponse>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `banUser`(request: Chat_BanUserRequest, headers: Connect.Headers) async -> ResponseMessage<Chat_BanUserResponse>
}

/// Concrete implementation of `Chat_ChatServiceClientInterface`.
public final class Chat_ChatServiceClient: Chat_ChatServiceClientInterface, Sendable {
    private let client: Connect.ProtocolClientInterface

    public init(client: Connect.ProtocolClientInterface) {
        self.client = client
    }

    @discardableResult
    public func `sendMessage`(request: Chat_SendMessageRequest, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Chat_SendMessageResponse>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/chat.ChatService/SendMessage", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `sendMessage`(request: Chat_SendMessageRequest, headers: Connect.Headers = [:]) async -> ResponseMessage<Chat_SendMessageResponse> {
        return await self.client.unary(path: "/chat.ChatService/SendMessage", request: request, headers: headers)
    }

    public func `receiveMessages`(headers: Connect.Headers = [:], onResult: @escaping @Sendable (Connect.StreamResult<Chat_Message>) -> Void) -> any Connect.ServerOnlyStreamInterface<Chat_ReceiveMessagesRequest> {
        return self.client.serverOnlyStream(path: "/chat.ChatService/ReceiveMessages", headers: headers, onResult: onResult)
    }

    @available(iOS 13, *)
    public func `receiveMessages`(headers: Connect.Headers = [:]) -> any Connect.ServerOnlyAsyncStreamInterface<Chat_ReceiveMessagesRequest, Chat_Message> {
        return self.client.serverOnlyStream(path: "/chat.ChatService/ReceiveMessages", headers: headers)
    }

    @discardableResult
    public func `banUser`(request: Chat_BanUserRequest, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<Chat_BanUserResponse>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/chat.ChatService/BanUser", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `banUser`(request: Chat_BanUserRequest, headers: Connect.Headers = [:]) async -> ResponseMessage<Chat_BanUserResponse> {
        return await self.client.unary(path: "/chat.ChatService/BanUser", request: request, headers: headers)
    }

    public enum Metadata {
        public enum Methods {
            public static let sendMessage = Connect.MethodSpec(name: "SendMessage", service: "chat.ChatService", type: .unary)
            public static let receiveMessages = Connect.MethodSpec(name: "ReceiveMessages", service: "chat.ChatService", type: .serverStream)
            public static let banUser = Connect.MethodSpec(name: "BanUser", service: "chat.ChatService", type: .unary)
        }
    }
}
