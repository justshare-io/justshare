// Code generated by protoc-gen-connect-swift. DO NOT EDIT.
//
// Source: user/user.proto
//

import Connect
import Foundation
import SwiftProtobuf

public protocol User_UserServiceClientInterface: Sendable {

    @discardableResult
    func `register`(request: User_User, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<User_User>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `register`(request: User_User, headers: Connect.Headers) async -> ResponseMessage<User_User>

    @discardableResult
    func `login`(request: User_User, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<User_User>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `login`(request: User_User, headers: Connect.Headers) async -> ResponseMessage<User_User>

    @discardableResult
    func `logout`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `logout`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>

    @discardableResult
    func `updateConfig`(request: User_Config, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `updateConfig`(request: User_Config, headers: Connect.Headers) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>

    @discardableResult
    func `createGroupInvite`(request: User_GroupID, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<User_GroupInvite>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `createGroupInvite`(request: User_GroupID, headers: Connect.Headers) async -> ResponseMessage<User_GroupInvite>

    @discardableResult
    func `joinGroup`(request: User_GroupInvite, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<User_Group>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `joinGroup`(request: User_GroupInvite, headers: Connect.Headers) async -> ResponseMessage<User_Group>

    @discardableResult
    func `groupInfo`(request: User_GroupInfoRequest, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<User_Group>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `groupInfo`(request: User_GroupInfoRequest, headers: Connect.Headers) async -> ResponseMessage<User_Group>

    @discardableResult
    func `createGroup`(request: User_Group, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<User_Group>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `createGroup`(request: User_Group, headers: Connect.Headers) async -> ResponseMessage<User_Group>

    @discardableResult
    func `getGroups`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<User_Groups>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `getGroups`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers) async -> ResponseMessage<User_Groups>

    @discardableResult
    func `deleteGroup`(request: User_Group, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `deleteGroup`(request: User_Group, headers: Connect.Headers) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>

    @discardableResult
    func `share`(request: User_ShareRequest, headers: Connect.Headers, completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable

    @available(iOS 13, *)
    func `share`(request: User_ShareRequest, headers: Connect.Headers) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>
}

/// Concrete implementation of `User_UserServiceClientInterface`.
public final class User_UserServiceClient: User_UserServiceClientInterface, Sendable {
    private let client: Connect.ProtocolClientInterface

    public init(client: Connect.ProtocolClientInterface) {
        self.client = client
    }

    @discardableResult
    public func `register`(request: User_User, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<User_User>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/Register", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `register`(request: User_User, headers: Connect.Headers = [:]) async -> ResponseMessage<User_User> {
        return await self.client.unary(path: "/user.UserService/Register", request: request, headers: headers)
    }

    @discardableResult
    public func `login`(request: User_User, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<User_User>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/Login", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `login`(request: User_User, headers: Connect.Headers = [:]) async -> ResponseMessage<User_User> {
        return await self.client.unary(path: "/user.UserService/Login", request: request, headers: headers)
    }

    @discardableResult
    public func `logout`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/Logout", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `logout`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:]) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty> {
        return await self.client.unary(path: "/user.UserService/Logout", request: request, headers: headers)
    }

    @discardableResult
    public func `updateConfig`(request: User_Config, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/UpdateConfig", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `updateConfig`(request: User_Config, headers: Connect.Headers = [:]) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty> {
        return await self.client.unary(path: "/user.UserService/UpdateConfig", request: request, headers: headers)
    }

    @discardableResult
    public func `createGroupInvite`(request: User_GroupID, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<User_GroupInvite>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/CreateGroupInvite", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `createGroupInvite`(request: User_GroupID, headers: Connect.Headers = [:]) async -> ResponseMessage<User_GroupInvite> {
        return await self.client.unary(path: "/user.UserService/CreateGroupInvite", request: request, headers: headers)
    }

    @discardableResult
    public func `joinGroup`(request: User_GroupInvite, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<User_Group>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/JoinGroup", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `joinGroup`(request: User_GroupInvite, headers: Connect.Headers = [:]) async -> ResponseMessage<User_Group> {
        return await self.client.unary(path: "/user.UserService/JoinGroup", request: request, headers: headers)
    }

    @discardableResult
    public func `groupInfo`(request: User_GroupInfoRequest, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<User_Group>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/GroupInfo", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `groupInfo`(request: User_GroupInfoRequest, headers: Connect.Headers = [:]) async -> ResponseMessage<User_Group> {
        return await self.client.unary(path: "/user.UserService/GroupInfo", request: request, headers: headers)
    }

    @discardableResult
    public func `createGroup`(request: User_Group, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<User_Group>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/CreateGroup", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `createGroup`(request: User_Group, headers: Connect.Headers = [:]) async -> ResponseMessage<User_Group> {
        return await self.client.unary(path: "/user.UserService/CreateGroup", request: request, headers: headers)
    }

    @discardableResult
    public func `getGroups`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<User_Groups>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/GetGroups", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `getGroups`(request: SwiftProtobuf.Google_Protobuf_Empty, headers: Connect.Headers = [:]) async -> ResponseMessage<User_Groups> {
        return await self.client.unary(path: "/user.UserService/GetGroups", request: request, headers: headers)
    }

    @discardableResult
    public func `deleteGroup`(request: User_Group, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/DeleteGroup", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `deleteGroup`(request: User_Group, headers: Connect.Headers = [:]) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty> {
        return await self.client.unary(path: "/user.UserService/DeleteGroup", request: request, headers: headers)
    }

    @discardableResult
    public func `share`(request: User_ShareRequest, headers: Connect.Headers = [:], completion: @escaping @Sendable (ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty>) -> Void) -> Connect.Cancelable {
        return self.client.unary(path: "/user.UserService/Share", request: request, headers: headers, completion: completion)
    }

    @available(iOS 13, *)
    public func `share`(request: User_ShareRequest, headers: Connect.Headers = [:]) async -> ResponseMessage<SwiftProtobuf.Google_Protobuf_Empty> {
        return await self.client.unary(path: "/user.UserService/Share", request: request, headers: headers)
    }

    public enum Metadata {
        public enum Methods {
            public static let register = Connect.MethodSpec(name: "Register", service: "user.UserService", type: .unary)
            public static let login = Connect.MethodSpec(name: "Login", service: "user.UserService", type: .unary)
            public static let logout = Connect.MethodSpec(name: "Logout", service: "user.UserService", type: .unary)
            public static let updateConfig = Connect.MethodSpec(name: "UpdateConfig", service: "user.UserService", type: .unary)
            public static let createGroupInvite = Connect.MethodSpec(name: "CreateGroupInvite", service: "user.UserService", type: .unary)
            public static let joinGroup = Connect.MethodSpec(name: "JoinGroup", service: "user.UserService", type: .unary)
            public static let groupInfo = Connect.MethodSpec(name: "GroupInfo", service: "user.UserService", type: .unary)
            public static let createGroup = Connect.MethodSpec(name: "CreateGroup", service: "user.UserService", type: .unary)
            public static let getGroups = Connect.MethodSpec(name: "GetGroups", service: "user.UserService", type: .unary)
            public static let deleteGroup = Connect.MethodSpec(name: "DeleteGroup", service: "user.UserService", type: .unary)
            public static let share = Connect.MethodSpec(name: "Share", service: "user.UserService", type: .unary)
        }
    }
}
