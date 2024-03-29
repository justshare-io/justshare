// DO NOT EDIT.
// swift-format-ignore-file
//
// Generated by the Swift generator plugin for the protocol buffer compiler.
// Source: event/event.proto
//
// For information on using the generated types, please see the documentation:
//   https://github.com/apple/swift-protobuf/

import Foundation
import SwiftProtobuf

// If the compiler emits an error on this type, it is because this file
// was generated by a version of the `protoc` Swift plug-in that is
// incompatible with the version of SwiftProtobuf to which you are linking.
// Please ensure that you are building against the same version of the API
// that was used to generate this file.
fileprivate struct _GeneratedWithProtocGenSwiftVersion: SwiftProtobuf.ProtobufAPIVersionCheck {
  struct _2: SwiftProtobuf.ProtobufAPIVersion_2 {}
  typealias Version = _2
}

public struct Event_Metric {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var type: Event_Metric.OneOf_Type? = nil

  public var http: Event_HTTPRequest {
    get {
      if case .http(let v)? = type {return v}
      return Event_HTTPRequest()
    }
    set {type = .http(newValue)}
  }

  public var rrweb: Event_RRWeb {
    get {
      if case .rrweb(let v)? = type {return v}
      return Event_RRWeb()
    }
    set {type = .rrweb(newValue)}
  }

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public enum OneOf_Type: Equatable {
    case http(Event_HTTPRequest)
    case rrweb(Event_RRWeb)

  #if !swift(>=4.1)
    public static func ==(lhs: Event_Metric.OneOf_Type, rhs: Event_Metric.OneOf_Type) -> Bool {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch (lhs, rhs) {
      case (.http, .http): return {
        guard case .http(let l) = lhs, case .http(let r) = rhs else { preconditionFailure() }
        return l == r
      }()
      case (.rrweb, .rrweb): return {
        guard case .rrweb(let l) = lhs, case .rrweb(let r) = rhs else { preconditionFailure() }
        return l == r
      }()
      default: return false
      }
    }
  #endif
  }

  public init() {}
}

public struct Event_HTTPRequest {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var method: String = String()

  public var path: String = String()

  public var query: String = String()

  public var headers: Dictionary<String,String> = [:]

  public var host: String = String()

  public var remoteAddr: String = String()

  public var userAgent: String = String()

  public var referer: String = String()

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}
}

public struct Event_RRWeb {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var events: String = String()

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}
}

public struct Event_SendResponse {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  public var id: String = String()

  public var unknownFields = SwiftProtobuf.UnknownStorage()

  public init() {}
}

#if swift(>=5.5) && canImport(_Concurrency)
extension Event_Metric: @unchecked Sendable {}
extension Event_Metric.OneOf_Type: @unchecked Sendable {}
extension Event_HTTPRequest: @unchecked Sendable {}
extension Event_RRWeb: @unchecked Sendable {}
extension Event_SendResponse: @unchecked Sendable {}
#endif  // swift(>=5.5) && canImport(_Concurrency)

// MARK: - Code below here is support for the SwiftProtobuf runtime.

fileprivate let _protobuf_package = "event"

extension Event_Metric: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".Metric"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "http"),
    2: .same(proto: "rrweb"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try {
        var v: Event_HTTPRequest?
        var hadOneofValue = false
        if let current = self.type {
          hadOneofValue = true
          if case .http(let m) = current {v = m}
        }
        try decoder.decodeSingularMessageField(value: &v)
        if let v = v {
          if hadOneofValue {try decoder.handleConflictingOneOf()}
          self.type = .http(v)
        }
      }()
      case 2: try {
        var v: Event_RRWeb?
        var hadOneofValue = false
        if let current = self.type {
          hadOneofValue = true
          if case .rrweb(let m) = current {v = m}
        }
        try decoder.decodeSingularMessageField(value: &v)
        if let v = v {
          if hadOneofValue {try decoder.handleConflictingOneOf()}
          self.type = .rrweb(v)
        }
      }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    // The use of inline closures is to circumvent an issue where the compiler
    // allocates stack space for every if/case branch local when no optimizations
    // are enabled. https://github.com/apple/swift-protobuf/issues/1034 and
    // https://github.com/apple/swift-protobuf/issues/1182
    switch self.type {
    case .http?: try {
      guard case .http(let v)? = self.type else { preconditionFailure() }
      try visitor.visitSingularMessageField(value: v, fieldNumber: 1)
    }()
    case .rrweb?: try {
      guard case .rrweb(let v)? = self.type else { preconditionFailure() }
      try visitor.visitSingularMessageField(value: v, fieldNumber: 2)
    }()
    case nil: break
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Event_Metric, rhs: Event_Metric) -> Bool {
    if lhs.type != rhs.type {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Event_HTTPRequest: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".HTTPRequest"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "method"),
    2: .same(proto: "path"),
    3: .same(proto: "query"),
    4: .same(proto: "headers"),
    5: .same(proto: "host"),
    6: .same(proto: "remoteAddr"),
    7: .same(proto: "userAgent"),
    8: .same(proto: "referer"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularStringField(value: &self.method) }()
      case 2: try { try decoder.decodeSingularStringField(value: &self.path) }()
      case 3: try { try decoder.decodeSingularStringField(value: &self.query) }()
      case 4: try { try decoder.decodeMapField(fieldType: SwiftProtobuf._ProtobufMap<SwiftProtobuf.ProtobufString,SwiftProtobuf.ProtobufString>.self, value: &self.headers) }()
      case 5: try { try decoder.decodeSingularStringField(value: &self.host) }()
      case 6: try { try decoder.decodeSingularStringField(value: &self.remoteAddr) }()
      case 7: try { try decoder.decodeSingularStringField(value: &self.userAgent) }()
      case 8: try { try decoder.decodeSingularStringField(value: &self.referer) }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if !self.method.isEmpty {
      try visitor.visitSingularStringField(value: self.method, fieldNumber: 1)
    }
    if !self.path.isEmpty {
      try visitor.visitSingularStringField(value: self.path, fieldNumber: 2)
    }
    if !self.query.isEmpty {
      try visitor.visitSingularStringField(value: self.query, fieldNumber: 3)
    }
    if !self.headers.isEmpty {
      try visitor.visitMapField(fieldType: SwiftProtobuf._ProtobufMap<SwiftProtobuf.ProtobufString,SwiftProtobuf.ProtobufString>.self, value: self.headers, fieldNumber: 4)
    }
    if !self.host.isEmpty {
      try visitor.visitSingularStringField(value: self.host, fieldNumber: 5)
    }
    if !self.remoteAddr.isEmpty {
      try visitor.visitSingularStringField(value: self.remoteAddr, fieldNumber: 6)
    }
    if !self.userAgent.isEmpty {
      try visitor.visitSingularStringField(value: self.userAgent, fieldNumber: 7)
    }
    if !self.referer.isEmpty {
      try visitor.visitSingularStringField(value: self.referer, fieldNumber: 8)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Event_HTTPRequest, rhs: Event_HTTPRequest) -> Bool {
    if lhs.method != rhs.method {return false}
    if lhs.path != rhs.path {return false}
    if lhs.query != rhs.query {return false}
    if lhs.headers != rhs.headers {return false}
    if lhs.host != rhs.host {return false}
    if lhs.remoteAddr != rhs.remoteAddr {return false}
    if lhs.userAgent != rhs.userAgent {return false}
    if lhs.referer != rhs.referer {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Event_RRWeb: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".RRWeb"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "events"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularStringField(value: &self.events) }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if !self.events.isEmpty {
      try visitor.visitSingularStringField(value: self.events, fieldNumber: 1)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Event_RRWeb, rhs: Event_RRWeb) -> Bool {
    if lhs.events != rhs.events {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension Event_SendResponse: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  public static let protoMessageName: String = _protobuf_package + ".SendResponse"
  public static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "id"),
  ]

  public mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularStringField(value: &self.id) }()
      default: break
      }
    }
  }

  public func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if !self.id.isEmpty {
      try visitor.visitSingularStringField(value: self.id, fieldNumber: 1)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  public static func ==(lhs: Event_SendResponse, rhs: Event_SendResponse) -> Bool {
    if lhs.id != rhs.id {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}
