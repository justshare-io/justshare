// @generated by protoc-gen-es v1.6.0 with parameter "target=ts"
// @generated from file event/event.proto (package event, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message event.Metric
 */
export class Metric extends Message<Metric> {
  /**
   * @generated from oneof event.Metric.type
   */
  type: {
    /**
     * @generated from field: event.HTTPRequest http = 1;
     */
    value: HTTPRequest;
    case: "http";
  } | {
    /**
     * @generated from field: event.RRWeb rrweb = 2;
     */
    value: RRWeb;
    case: "rrweb";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<Metric>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "event.Metric";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "http", kind: "message", T: HTTPRequest, oneof: "type" },
    { no: 2, name: "rrweb", kind: "message", T: RRWeb, oneof: "type" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Metric {
    return new Metric().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Metric {
    return new Metric().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Metric {
    return new Metric().fromJsonString(jsonString, options);
  }

  static equals(a: Metric | PlainMessage<Metric> | undefined, b: Metric | PlainMessage<Metric> | undefined): boolean {
    return proto3.util.equals(Metric, a, b);
  }
}

/**
 * @generated from message event.HTTPRequest
 */
export class HTTPRequest extends Message<HTTPRequest> {
  /**
   * @generated from field: string method = 1;
   */
  method = "";

  /**
   * @generated from field: string path = 2;
   */
  path = "";

  /**
   * @generated from field: string query = 3;
   */
  query = "";

  /**
   * @generated from field: map<string, string> headers = 4;
   */
  headers: { [key: string]: string } = {};

  /**
   * @generated from field: string host = 5;
   */
  host = "";

  /**
   * @generated from field: string remoteAddr = 6;
   */
  remoteAddr = "";

  /**
   * @generated from field: string userAgent = 7;
   */
  userAgent = "";

  /**
   * @generated from field: string referer = 8;
   */
  referer = "";

  constructor(data?: PartialMessage<HTTPRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "event.HTTPRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "method", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "query", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "headers", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 5, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "remoteAddr", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "userAgent", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "referer", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HTTPRequest {
    return new HTTPRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HTTPRequest {
    return new HTTPRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HTTPRequest {
    return new HTTPRequest().fromJsonString(jsonString, options);
  }

  static equals(a: HTTPRequest | PlainMessage<HTTPRequest> | undefined, b: HTTPRequest | PlainMessage<HTTPRequest> | undefined): boolean {
    return proto3.util.equals(HTTPRequest, a, b);
  }
}

/**
 * @generated from message event.RRWeb
 */
export class RRWeb extends Message<RRWeb> {
  /**
   * @generated from field: string events = 1;
   */
  events = "";

  constructor(data?: PartialMessage<RRWeb>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "event.RRWeb";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "events", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RRWeb {
    return new RRWeb().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RRWeb {
    return new RRWeb().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RRWeb {
    return new RRWeb().fromJsonString(jsonString, options);
  }

  static equals(a: RRWeb | PlainMessage<RRWeb> | undefined, b: RRWeb | PlainMessage<RRWeb> | undefined): boolean {
    return proto3.util.equals(RRWeb, a, b);
  }
}

/**
 * @generated from message event.SendResponse
 */
export class SendResponse extends Message<SendResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<SendResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "event.SendResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendResponse {
    return new SendResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendResponse {
    return new SendResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendResponse {
    return new SendResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SendResponse | PlainMessage<SendResponse> | undefined, b: SendResponse | PlainMessage<SendResponse> | undefined): boolean {
    return proto3.util.equals(SendResponse, a, b);
  }
}

