// @generated by protoc-gen-es v1.6.0 with parameter "target=ts"
// @generated from file protoflow.proto (package protoflow, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message protoflow.AnalyzeConversationRequest
 */
export class AnalyzeConversationRequest extends Message<AnalyzeConversationRequest> {
  /**
   * @generated from field: string text = 1;
   */
  text = "";

  constructor(data?: PartialMessage<AnalyzeConversationRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.AnalyzeConversationRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AnalyzeConversationRequest {
    return new AnalyzeConversationRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AnalyzeConversationRequest {
    return new AnalyzeConversationRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AnalyzeConversationRequest {
    return new AnalyzeConversationRequest().fromJsonString(jsonString, options);
  }

  static equals(a: AnalyzeConversationRequest | PlainMessage<AnalyzeConversationRequest> | undefined, b: AnalyzeConversationRequest | PlainMessage<AnalyzeConversationRequest> | undefined): boolean {
    return proto3.util.equals(AnalyzeConversationRequest, a, b);
  }
}

/**
 * @generated from message protoflow.GenerateImagesRequest
 */
export class GenerateImagesRequest extends Message<GenerateImagesRequest> {
  /**
   * @generated from field: string prompt = 1;
   */
  prompt = "";

  constructor(data?: PartialMessage<GenerateImagesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GenerateImagesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "prompt", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GenerateImagesRequest {
    return new GenerateImagesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GenerateImagesRequest {
    return new GenerateImagesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GenerateImagesRequest {
    return new GenerateImagesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GenerateImagesRequest | PlainMessage<GenerateImagesRequest> | undefined, b: GenerateImagesRequest | PlainMessage<GenerateImagesRequest> | undefined): boolean {
    return proto3.util.equals(GenerateImagesRequest, a, b);
  }
}

/**
 * @generated from message protoflow.GenerateImagesResponse
 */
export class GenerateImagesResponse extends Message<GenerateImagesResponse> {
  /**
   * @generated from field: repeated string images = 1;
   */
  images: string[] = [];

  constructor(data?: PartialMessage<GenerateImagesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GenerateImagesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "images", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GenerateImagesResponse {
    return new GenerateImagesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GenerateImagesResponse {
    return new GenerateImagesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GenerateImagesResponse {
    return new GenerateImagesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GenerateImagesResponse | PlainMessage<GenerateImagesResponse> | undefined, b: GenerateImagesResponse | PlainMessage<GenerateImagesResponse> | undefined): boolean {
    return proto3.util.equals(GenerateImagesResponse, a, b);
  }
}

/**
 * @generated from message protoflow.DeleteSessionRequest
 */
export class DeleteSessionRequest extends Message<DeleteSessionRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<DeleteSessionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.DeleteSessionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteSessionRequest {
    return new DeleteSessionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteSessionRequest {
    return new DeleteSessionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteSessionRequest {
    return new DeleteSessionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteSessionRequest | PlainMessage<DeleteSessionRequest> | undefined, b: DeleteSessionRequest | PlainMessage<DeleteSessionRequest> | undefined): boolean {
    return proto3.util.equals(DeleteSessionRequest, a, b);
  }
}

/**
 * @generated from message protoflow.Prompt
 */
export class Prompt extends Message<Prompt> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string text = 2;
   */
  text = "";

  constructor(data?: PartialMessage<Prompt>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.Prompt";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Prompt {
    return new Prompt().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Prompt {
    return new Prompt().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Prompt {
    return new Prompt().fromJsonString(jsonString, options);
  }

  static equals(a: Prompt | PlainMessage<Prompt> | undefined, b: Prompt | PlainMessage<Prompt> | undefined): boolean {
    return proto3.util.equals(Prompt, a, b);
  }
}

/**
 * @generated from message protoflow.GetPromptsRequest
 */
export class GetPromptsRequest extends Message<GetPromptsRequest> {
  constructor(data?: PartialMessage<GetPromptsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GetPromptsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPromptsRequest {
    return new GetPromptsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPromptsRequest {
    return new GetPromptsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPromptsRequest {
    return new GetPromptsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetPromptsRequest | PlainMessage<GetPromptsRequest> | undefined, b: GetPromptsRequest | PlainMessage<GetPromptsRequest> | undefined): boolean {
    return proto3.util.equals(GetPromptsRequest, a, b);
  }
}

/**
 * @generated from message protoflow.GetPromptsResponse
 */
export class GetPromptsResponse extends Message<GetPromptsResponse> {
  /**
   * @generated from field: repeated protoflow.Prompt prompts = 1;
   */
  prompts: Prompt[] = [];

  constructor(data?: PartialMessage<GetPromptsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GetPromptsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "prompts", kind: "message", T: Prompt, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPromptsResponse {
    return new GetPromptsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPromptsResponse {
    return new GetPromptsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPromptsResponse {
    return new GetPromptsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetPromptsResponse | PlainMessage<GetPromptsResponse> | undefined, b: GetPromptsResponse | PlainMessage<GetPromptsResponse> | undefined): boolean {
    return proto3.util.equals(GetPromptsResponse, a, b);
  }
}

/**
 * @generated from message protoflow.InferRequest
 */
export class InferRequest extends Message<InferRequest> {
  /**
   * @generated from field: string prompt = 1;
   */
  prompt = "";

  /**
   * @generated from field: repeated string text = 2;
   */
  text: string[] = [];

  constructor(data?: PartialMessage<InferRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.InferRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "prompt", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): InferRequest {
    return new InferRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): InferRequest {
    return new InferRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): InferRequest {
    return new InferRequest().fromJsonString(jsonString, options);
  }

  static equals(a: InferRequest | PlainMessage<InferRequest> | undefined, b: InferRequest | PlainMessage<InferRequest> | undefined): boolean {
    return proto3.util.equals(InferRequest, a, b);
  }
}

/**
 * @generated from message protoflow.InferResponse
 */
export class InferResponse extends Message<InferResponse> {
  /**
   * @generated from field: string text = 1;
   */
  text = "";

  constructor(data?: PartialMessage<InferResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.InferResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): InferResponse {
    return new InferResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): InferResponse {
    return new InferResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): InferResponse {
    return new InferResponse().fromJsonString(jsonString, options);
  }

  static equals(a: InferResponse | PlainMessage<InferResponse> | undefined, b: InferResponse | PlainMessage<InferResponse> | undefined): boolean {
    return proto3.util.equals(InferResponse, a, b);
  }
}

/**
 * @generated from message protoflow.GetSessionRequest
 */
export class GetSessionRequest extends Message<GetSessionRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<GetSessionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GetSessionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSessionRequest {
    return new GetSessionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSessionRequest {
    return new GetSessionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSessionRequest {
    return new GetSessionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetSessionRequest | PlainMessage<GetSessionRequest> | undefined, b: GetSessionRequest | PlainMessage<GetSessionRequest> | undefined): boolean {
    return proto3.util.equals(GetSessionRequest, a, b);
  }
}

/**
 * @generated from message protoflow.GetSessionResponse
 */
export class GetSessionResponse extends Message<GetSessionResponse> {
  /**
   * @generated from field: protoflow.Session session = 1;
   */
  session?: Session;

  constructor(data?: PartialMessage<GetSessionResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GetSessionResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "session", kind: "message", T: Session },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSessionResponse {
    return new GetSessionResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSessionResponse {
    return new GetSessionResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSessionResponse {
    return new GetSessionResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetSessionResponse | PlainMessage<GetSessionResponse> | undefined, b: GetSessionResponse | PlainMessage<GetSessionResponse> | undefined): boolean {
    return proto3.util.equals(GetSessionResponse, a, b);
  }
}

/**
 * @generated from message protoflow.GetSessionsRequest
 */
export class GetSessionsRequest extends Message<GetSessionsRequest> {
  /**
   * @generated from field: uint64 page = 1;
   */
  page = protoInt64.zero;

  /**
   * @generated from field: uint64 limit = 2;
   */
  limit = protoInt64.zero;

  constructor(data?: PartialMessage<GetSessionsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GetSessionsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "page", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "limit", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSessionsRequest {
    return new GetSessionsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSessionsRequest {
    return new GetSessionsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSessionsRequest {
    return new GetSessionsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetSessionsRequest | PlainMessage<GetSessionsRequest> | undefined, b: GetSessionsRequest | PlainMessage<GetSessionsRequest> | undefined): boolean {
    return proto3.util.equals(GetSessionsRequest, a, b);
  }
}

/**
 * @generated from message protoflow.GetSessionsResponse
 */
export class GetSessionsResponse extends Message<GetSessionsResponse> {
  /**
   * @generated from field: repeated protoflow.Session sessions = 1;
   */
  sessions: Session[] = [];

  constructor(data?: PartialMessage<GetSessionsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.GetSessionsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "sessions", kind: "message", T: Session, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSessionsResponse {
    return new GetSessionsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSessionsResponse {
    return new GetSessionsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSessionsResponse {
    return new GetSessionsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetSessionsResponse | PlainMessage<GetSessionsResponse> | undefined, b: GetSessionsResponse | PlainMessage<GetSessionsResponse> | undefined): boolean {
    return proto3.util.equals(GetSessionsResponse, a, b);
  }
}

/**
 * @generated from message protoflow.Token
 */
export class Token extends Message<Token> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: uint64 start_time = 2;
   */
  startTime = protoInt64.zero;

  /**
   * @generated from field: uint64 end_time = 3;
   */
  endTime = protoInt64.zero;

  /**
   * @generated from field: string text = 4;
   */
  text = "";

  /**
   * @generated from field: string p = 5;
   */
  p = "";

  constructor(data?: PartialMessage<Token>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.Token";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "start_time", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "end_time", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "p", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Token {
    return new Token().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Token {
    return new Token().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Token {
    return new Token().fromJsonString(jsonString, options);
  }

  static equals(a: Token | PlainMessage<Token> | undefined, b: Token | PlainMessage<Token> | undefined): boolean {
    return proto3.util.equals(Token, a, b);
  }
}

/**
 * @generated from message protoflow.Segment
 */
export class Segment extends Message<Segment> {
  /**
   * @generated from field: uint32 num = 1;
   */
  num = 0;

  /**
   * @generated from field: repeated protoflow.Token tokens = 2;
   */
  tokens: Token[] = [];

  /**
   * @generated from field: string text = 3;
   */
  text = "";

  /**
   * @generated from field: uint64 start_time = 4;
   */
  startTime = protoInt64.zero;

  /**
   * @generated from field: uint64 end_time = 5;
   */
  endTime = protoInt64.zero;

  constructor(data?: PartialMessage<Segment>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.Segment";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "num", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "tokens", kind: "message", T: Token, repeated: true },
    { no: 3, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "start_time", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "end_time", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Segment {
    return new Segment().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Segment {
    return new Segment().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Segment {
    return new Segment().fromJsonString(jsonString, options);
  }

  static equals(a: Segment | PlainMessage<Segment> | undefined, b: Segment | PlainMessage<Segment> | undefined): boolean {
    return proto3.util.equals(Segment, a, b);
  }
}

/**
 * @generated from message protoflow.Session
 */
export class Session extends Message<Session> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: repeated protoflow.Segment segments = 3;
   */
  segments: Segment[] = [];

  constructor(data?: PartialMessage<Session>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.Session";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "segments", kind: "message", T: Segment, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Session {
    return new Session().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Session {
    return new Session().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Session {
    return new Session().fromJsonString(jsonString, options);
  }

  static equals(a: Session | PlainMessage<Session> | undefined, b: Session | PlainMessage<Session> | undefined): boolean {
    return proto3.util.equals(Session, a, b);
  }
}

/**
 * @generated from message protoflow.TranscriptionRequest
 */
export class TranscriptionRequest extends Message<TranscriptionRequest> {
  /**
   * @generated from field: string file_path = 14;
   */
  filePath = "";

  /**
   * Path to the model file
   *
   * @generated from field: string model = 1;
   */
  model = "";

  /**
   * Spoken language
   *
   * @generated from field: string language = 2;
   */
  language = "";

  /**
   * Translate from source language to English
   *
   * @generated from field: bool translate = 3;
   */
  translate = false;

  /**
   * Time offset in nanoseconds to match Go's time.Duration
   *
   * @generated from field: int64 offset = 4;
   */
  offset = protoInt64.zero;

  /**
   * Duration of audio to process in nanoseconds
   *
   * @generated from field: int64 duration = 5;
   */
  duration = protoInt64.zero;

  /**
   * Number of threads to use
   *
   * @generated from field: uint32 threads = 6;
   */
  threads = 0;

  /**
   * Enable speedup
   *
   * @generated from field: bool speedup = 7;
   */
  speedup = false;

  /**
   * Maximum segment length in characters
   *
   * @generated from field: uint32 max_len = 8;
   */
  maxLen = 0;

  /**
   * Maximum tokens per segment
   *
   * @generated from field: uint32 max_tokens = 9;
   */
  maxTokens = 0;

  /**
   * Maximum segment score
   *
   * @generated from field: double word_threshold = 10;
   */
  wordThreshold = 0;

  /**
   * Display tokens
   *
   * @generated from field: bool tokens = 11;
   */
  tokens = false;

  /**
   * Colorize tokens
   *
   * @generated from field: bool colorize = 12;
   */
  colorize = false;

  /**
   * Output format (srt, none or leave as empty string)
   *
   * @generated from field: string out = 13;
   */
  out = "";

  constructor(data?: PartialMessage<TranscriptionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.TranscriptionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 14, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 1, name: "model", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "language", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "translate", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "offset", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "duration", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 6, name: "threads", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 7, name: "speedup", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 8, name: "max_len", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 9, name: "max_tokens", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 10, name: "word_threshold", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 11, name: "tokens", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 12, name: "colorize", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 13, name: "out", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TranscriptionRequest {
    return new TranscriptionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TranscriptionRequest {
    return new TranscriptionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TranscriptionRequest {
    return new TranscriptionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: TranscriptionRequest | PlainMessage<TranscriptionRequest> | undefined, b: TranscriptionRequest | PlainMessage<TranscriptionRequest> | undefined): boolean {
    return proto3.util.equals(TranscriptionRequest, a, b);
  }
}

/**
 * @generated from message protoflow.RegisterFlags
 */
export class RegisterFlags extends Message<RegisterFlags> {
  constructor(data?: PartialMessage<RegisterFlags>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.RegisterFlags";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterFlags {
    return new RegisterFlags().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterFlags {
    return new RegisterFlags().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterFlags {
    return new RegisterFlags().fromJsonString(jsonString, options);
  }

  static equals(a: RegisterFlags | PlainMessage<RegisterFlags> | undefined, b: RegisterFlags | PlainMessage<RegisterFlags> | undefined): boolean {
    return proto3.util.equals(RegisterFlags, a, b);
  }
}

/**
 * @generated from message protoflow.OCRText
 */
export class OCRText extends Message<OCRText> {
  /**
   * @generated from field: string text = 1;
   */
  text = "";

  constructor(data?: PartialMessage<OCRText>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.OCRText";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OCRText {
    return new OCRText().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OCRText {
    return new OCRText().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OCRText {
    return new OCRText().fromJsonString(jsonString, options);
  }

  static equals(a: OCRText | PlainMessage<OCRText> | undefined, b: OCRText | PlainMessage<OCRText> | undefined): boolean {
    return proto3.util.equals(OCRText, a, b);
  }
}

/**
 * @generated from message protoflow.Image
 */
export class Image extends Message<Image> {
  /**
   * @generated from field: bytes image = 1;
   */
  image = new Uint8Array(0);

  constructor(data?: PartialMessage<Image>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.Image";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "image", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Image {
    return new Image().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Image {
    return new Image().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Image {
    return new Image().fromJsonString(jsonString, options);
  }

  static equals(a: Image | PlainMessage<Image> | undefined, b: Image | PlainMessage<Image> | undefined): boolean {
    return proto3.util.equals(Image, a, b);
  }
}

/**
 * @generated from message protoflow.ConvertFileRequest
 */
export class ConvertFileRequest extends Message<ConvertFileRequest> {
  /**
   * @generated from field: string from = 1;
   */
  from = "";

  /**
   * @generated from field: string to = 2;
   */
  to = "";

  constructor(data?: PartialMessage<ConvertFileRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.ConvertFileRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "to", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConvertFileRequest {
    return new ConvertFileRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConvertFileRequest {
    return new ConvertFileRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConvertFileRequest {
    return new ConvertFileRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ConvertFileRequest | PlainMessage<ConvertFileRequest> | undefined, b: ConvertFileRequest | PlainMessage<ConvertFileRequest> | undefined): boolean {
    return proto3.util.equals(ConvertFileRequest, a, b);
  }
}

/**
 * @generated from message protoflow.ChatRequest
 */
export class ChatRequest extends Message<ChatRequest> {
  /**
   * @generated from field: int32 capture_device = 1;
   */
  captureDevice = 0;

  constructor(data?: PartialMessage<ChatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.ChatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "capture_device", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatRequest {
    return new ChatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatRequest {
    return new ChatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatRequest {
    return new ChatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatRequest | PlainMessage<ChatRequest> | undefined, b: ChatRequest | PlainMessage<ChatRequest> | undefined): boolean {
    return proto3.util.equals(ChatRequest, a, b);
  }
}

/**
 * @generated from message protoflow.ChatResponse
 */
export class ChatResponse extends Message<ChatResponse> {
  /**
   * @generated from field: protoflow.Segment segment = 1;
   */
  segment?: Segment;

  constructor(data?: PartialMessage<ChatResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.ChatResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "segment", kind: "message", T: Segment },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatResponse {
    return new ChatResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatResponse {
    return new ChatResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatResponse {
    return new ChatResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatResponse | PlainMessage<ChatResponse> | undefined, b: ChatResponse | PlainMessage<ChatResponse> | undefined): boolean {
    return proto3.util.equals(ChatResponse, a, b);
  }
}

/**
 * @generated from message protoflow.YouTubeVideo
 */
export class YouTubeVideo extends Message<YouTubeVideo> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string file = 2;
   */
  file = "";

  constructor(data?: PartialMessage<YouTubeVideo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.YouTubeVideo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): YouTubeVideo {
    return new YouTubeVideo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): YouTubeVideo {
    return new YouTubeVideo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): YouTubeVideo {
    return new YouTubeVideo().fromJsonString(jsonString, options);
  }

  static equals(a: YouTubeVideo | PlainMessage<YouTubeVideo> | undefined, b: YouTubeVideo | PlainMessage<YouTubeVideo> | undefined): boolean {
    return proto3.util.equals(YouTubeVideo, a, b);
  }
}

/**
 * @generated from message protoflow.FilePath
 */
export class FilePath extends Message<FilePath> {
  /**
   * @generated from field: string file = 1;
   */
  file = "";

  constructor(data?: PartialMessage<FilePath>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.FilePath";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FilePath {
    return new FilePath().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FilePath {
    return new FilePath().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FilePath {
    return new FilePath().fromJsonString(jsonString, options);
  }

  static equals(a: FilePath | PlainMessage<FilePath> | undefined, b: FilePath | PlainMessage<FilePath> | undefined): boolean {
    return proto3.util.equals(FilePath, a, b);
  }
}

/**
 * @generated from message protoflow.YouTubeVideoResponse
 */
export class YouTubeVideoResponse extends Message<YouTubeVideoResponse> {
  /**
   * @generated from field: string title = 1;
   */
  title = "";

  /**
   * @generated from field: protoflow.FilePath file_path = 2;
   */
  filePath?: FilePath;

  constructor(data?: PartialMessage<YouTubeVideoResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protoflow.YouTubeVideoResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file_path", kind: "message", T: FilePath },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): YouTubeVideoResponse {
    return new YouTubeVideoResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): YouTubeVideoResponse {
    return new YouTubeVideoResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): YouTubeVideoResponse {
    return new YouTubeVideoResponse().fromJsonString(jsonString, options);
  }

  static equals(a: YouTubeVideoResponse | PlainMessage<YouTubeVideoResponse> | undefined, b: YouTubeVideoResponse | PlainMessage<YouTubeVideoResponse> | undefined): boolean {
    return proto3.util.equals(YouTubeVideoResponse, a, b);
  }
}

