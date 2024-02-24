// @generated by protoc-gen-es v1.6.0 with parameter "target=ts"
// @generated from file user/user.proto (package user, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message user.VerifyUserRequest
 */
export class VerifyUserRequest extends Message<VerifyUserRequest> {
  /**
   * @generated from field: string secret = 1;
   */
  secret = "";

  constructor(data?: PartialMessage<VerifyUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.VerifyUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "secret", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VerifyUserRequest {
    return new VerifyUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VerifyUserRequest {
    return new VerifyUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VerifyUserRequest {
    return new VerifyUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: VerifyUserRequest | PlainMessage<VerifyUserRequest> | undefined, b: VerifyUserRequest | PlainMessage<VerifyUserRequest> | undefined): boolean {
    return proto3.util.equals(VerifyUserRequest, a, b);
  }
}

/**
 * @generated from message user.GroupInfoRequest
 */
export class GroupInfoRequest extends Message<GroupInfoRequest> {
  /**
   * @generated from field: string secret = 1;
   */
  secret = "";

  constructor(data?: PartialMessage<GroupInfoRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.GroupInfoRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "secret", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GroupInfoRequest {
    return new GroupInfoRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GroupInfoRequest {
    return new GroupInfoRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GroupInfoRequest {
    return new GroupInfoRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GroupInfoRequest | PlainMessage<GroupInfoRequest> | undefined, b: GroupInfoRequest | PlainMessage<GroupInfoRequest> | undefined): boolean {
    return proto3.util.equals(GroupInfoRequest, a, b);
  }
}

/**
 * @generated from message user.GroupID
 */
export class GroupID extends Message<GroupID> {
  /**
   * @generated from field: string group_id = 1;
   */
  groupId = "";

  constructor(data?: PartialMessage<GroupID>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.GroupID";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "group_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GroupID {
    return new GroupID().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GroupID {
    return new GroupID().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GroupID {
    return new GroupID().fromJsonString(jsonString, options);
  }

  static equals(a: GroupID | PlainMessage<GroupID> | undefined, b: GroupID | PlainMessage<GroupID> | undefined): boolean {
    return proto3.util.equals(GroupID, a, b);
  }
}

/**
 * @generated from message user.ShareRequest
 */
export class ShareRequest extends Message<ShareRequest> {
  /**
   * @generated from field: string content_id = 1;
   */
  contentId = "";

  /**
   * @generated from field: string group_id = 2;
   */
  groupId = "";

  constructor(data?: PartialMessage<ShareRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.ShareRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "content_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "group_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ShareRequest {
    return new ShareRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ShareRequest {
    return new ShareRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ShareRequest {
    return new ShareRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ShareRequest | PlainMessage<ShareRequest> | undefined, b: ShareRequest | PlainMessage<ShareRequest> | undefined): boolean {
    return proto3.util.equals(ShareRequest, a, b);
  }
}

/**
 * @generated from message user.GroupInvite
 */
export class GroupInvite extends Message<GroupInvite> {
  /**
   * @generated from field: string secret = 1;
   */
  secret = "";

  constructor(data?: PartialMessage<GroupInvite>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.GroupInvite";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "secret", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GroupInvite {
    return new GroupInvite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GroupInvite {
    return new GroupInvite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GroupInvite {
    return new GroupInvite().fromJsonString(jsonString, options);
  }

  static equals(a: GroupInvite | PlainMessage<GroupInvite> | undefined, b: GroupInvite | PlainMessage<GroupInvite> | undefined): boolean {
    return proto3.util.equals(GroupInvite, a, b);
  }
}

/**
 * @generated from message user.Groups
 */
export class Groups extends Message<Groups> {
  /**
   * @generated from field: repeated user.Group groups = 1;
   */
  groups: Group[] = [];

  constructor(data?: PartialMessage<Groups>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.Groups";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "groups", kind: "message", T: Group, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Groups {
    return new Groups().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Groups {
    return new Groups().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Groups {
    return new Groups().fromJsonString(jsonString, options);
  }

  static equals(a: Groups | PlainMessage<Groups> | undefined, b: Groups | PlainMessage<Groups> | undefined): boolean {
    return proto3.util.equals(Groups, a, b);
  }
}

/**
 * @generated from message user.AnalyzeConversationRequest
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
  static readonly typeName = "user.AnalyzeConversationRequest";
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
 * @generated from message user.User
 */
export class User extends Message<User> {
  /**
   * @generated from field: string email = 1;
   */
  email = "";

  /**
   * @generated from field: string password = 2;
   */
  password = "";

  /**
   * @generated from field: string username = 3;
   */
  username = "";

  /**
   * @generated from field: user.Config config = 4;
   */
  config?: Config;

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "config", kind: "message", T: Config },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): User {
    return new User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): User {
    return new User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): User {
    return new User().fromJsonString(jsonString, options);
  }

  static equals(a: User | PlainMessage<User> | undefined, b: User | PlainMessage<User> | undefined): boolean {
    return proto3.util.equals(User, a, b);
  }
}

/**
 * @generated from message user.Usage
 */
export class Usage extends Message<Usage> {
  /**
   * @generated from field: string user_id = 1;
   */
  userId = "";

  /**
   * @generated from field: int64 database_storage_used = 2;
   */
  databaseStorageUsed = protoInt64.zero;

  /**
   * @generated from field: int64 file_storage_used = 3;
   */
  fileStorageUsed = protoInt64.zero;

  constructor(data?: PartialMessage<Usage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.Usage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "database_storage_used", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "file_storage_used", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Usage {
    return new Usage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Usage {
    return new Usage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Usage {
    return new Usage().fromJsonString(jsonString, options);
  }

  static equals(a: Usage | PlainMessage<Usage> | undefined, b: Usage | PlainMessage<Usage> | undefined): boolean {
    return proto3.util.equals(Usage, a, b);
  }
}

/**
 * @generated from message user.Group
 */
export class Group extends Message<Group> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: repeated string users = 3;
   */
  users: string[] = [];

  constructor(data?: PartialMessage<Group>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.Group";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "users", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Group {
    return new Group().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Group {
    return new Group().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Group {
    return new Group().fromJsonString(jsonString, options);
  }

  static equals(a: Group | PlainMessage<Group> | undefined, b: Group | PlainMessage<Group> | undefined): boolean {
    return proto3.util.equals(Group, a, b);
  }
}

/**
 * @generated from message user.Config
 */
export class Config extends Message<Config> {
  /**
   * @generated from field: repeated string domain_whitelist = 1;
   */
  domainWhitelist: string[] = [];

  /**
   * @generated from field: bool offline_voice = 2;
   */
  offlineVoice = false;

  constructor(data?: PartialMessage<Config>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.Config";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "domain_whitelist", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "offline_voice", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Config {
    return new Config().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJsonString(jsonString, options);
  }

  static equals(a: Config | PlainMessage<Config> | undefined, b: Config | PlainMessage<Config> | undefined): boolean {
    return proto3.util.equals(Config, a, b);
  }
}

/**
 * @generated from message user.LoginResponse
 */
export class LoginResponse extends Message<LoginResponse> {
  /**
   * @generated from field: user.User user = 1;
   */
  user?: User;

  /**
   * @generated from field: bool success = 2;
   */
  success = false;

  /**
   * @generated from field: int64 expires = 3;
   */
  expires = protoInt64.zero;

  constructor(data?: PartialMessage<LoginResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "user.LoginResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
    { no: 2, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "expires", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LoginResponse {
    return new LoginResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LoginResponse {
    return new LoginResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LoginResponse {
    return new LoginResponse().fromJsonString(jsonString, options);
  }

  static equals(a: LoginResponse | PlainMessage<LoginResponse> | undefined, b: LoginResponse | PlainMessage<LoginResponse> | undefined): boolean {
    return proto3.util.equals(LoginResponse, a, b);
  }
}

