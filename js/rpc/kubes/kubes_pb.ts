// @generated by protoc-gen-es v1.6.0 with parameter "target=ts"
// @generated from file kubes/kubes.proto (package kubes, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message kubes.BuildImageRequest
 */
export class BuildImageRequest extends Message<BuildImageRequest> {
  /**
   * @generated from field: string image = 1;
   */
  image = "";

  /**
   * @generated from field: string dockerfile = 2;
   */
  dockerfile = "";

  /**
   * @generated from field: string context = 3;
   */
  context = "";

  constructor(data?: PartialMessage<BuildImageRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.BuildImageRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "image", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "dockerfile", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "context", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BuildImageRequest {
    return new BuildImageRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BuildImageRequest {
    return new BuildImageRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BuildImageRequest {
    return new BuildImageRequest().fromJsonString(jsonString, options);
  }

  static equals(a: BuildImageRequest | PlainMessage<BuildImageRequest> | undefined, b: BuildImageRequest | PlainMessage<BuildImageRequest> | undefined): boolean {
    return proto3.util.equals(BuildImageRequest, a, b);
  }
}

/**
 * @generated from message kubes.BuildImageResponse
 */
export class BuildImageResponse extends Message<BuildImageResponse> {
  /**
   * @generated from field: string tagged_image = 1;
   */
  taggedImage = "";

  constructor(data?: PartialMessage<BuildImageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.BuildImageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "tagged_image", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BuildImageResponse {
    return new BuildImageResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BuildImageResponse {
    return new BuildImageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BuildImageResponse {
    return new BuildImageResponse().fromJsonString(jsonString, options);
  }

  static equals(a: BuildImageResponse | PlainMessage<BuildImageResponse> | undefined, b: BuildImageResponse | PlainMessage<BuildImageResponse> | undefined): boolean {
    return proto3.util.equals(BuildImageResponse, a, b);
  }
}

/**
 * @generated from message kubes.UpdateDeploymentRequest
 */
export class UpdateDeploymentRequest extends Message<UpdateDeploymentRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string image = 2;
   */
  image = "";

  constructor(data?: PartialMessage<UpdateDeploymentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.UpdateDeploymentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "image", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateDeploymentRequest {
    return new UpdateDeploymentRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateDeploymentRequest {
    return new UpdateDeploymentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateDeploymentRequest {
    return new UpdateDeploymentRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateDeploymentRequest | PlainMessage<UpdateDeploymentRequest> | undefined, b: UpdateDeploymentRequest | PlainMessage<UpdateDeploymentRequest> | undefined): boolean {
    return proto3.util.equals(UpdateDeploymentRequest, a, b);
  }
}

/**
 * @generated from message kubes.UpdateDeploymentResponse
 */
export class UpdateDeploymentResponse extends Message<UpdateDeploymentResponse> {
  constructor(data?: PartialMessage<UpdateDeploymentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.UpdateDeploymentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateDeploymentResponse {
    return new UpdateDeploymentResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateDeploymentResponse {
    return new UpdateDeploymentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateDeploymentResponse {
    return new UpdateDeploymentResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateDeploymentResponse | PlainMessage<UpdateDeploymentResponse> | undefined, b: UpdateDeploymentResponse | PlainMessage<UpdateDeploymentResponse> | undefined): boolean {
    return proto3.util.equals(UpdateDeploymentResponse, a, b);
  }
}

/**
 * @generated from message kubes.NewIngressRequest
 */
export class NewIngressRequest extends Message<NewIngressRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string namespace = 2;
   */
  namespace = "";

  constructor(data?: PartialMessage<NewIngressRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.NewIngressRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "namespace", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NewIngressRequest {
    return new NewIngressRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NewIngressRequest {
    return new NewIngressRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NewIngressRequest {
    return new NewIngressRequest().fromJsonString(jsonString, options);
  }

  static equals(a: NewIngressRequest | PlainMessage<NewIngressRequest> | undefined, b: NewIngressRequest | PlainMessage<NewIngressRequest> | undefined): boolean {
    return proto3.util.equals(NewIngressRequest, a, b);
  }
}

/**
 * @generated from message kubes.NewIngressResponse
 */
export class NewIngressResponse extends Message<NewIngressResponse> {
  constructor(data?: PartialMessage<NewIngressResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.NewIngressResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NewIngressResponse {
    return new NewIngressResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NewIngressResponse {
    return new NewIngressResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NewIngressResponse {
    return new NewIngressResponse().fromJsonString(jsonString, options);
  }

  static equals(a: NewIngressResponse | PlainMessage<NewIngressResponse> | undefined, b: NewIngressResponse | PlainMessage<NewIngressResponse> | undefined): boolean {
    return proto3.util.equals(NewIngressResponse, a, b);
  }
}

/**
 * @generated from message kubes.DeleteDeploymentRequest
 */
export class DeleteDeploymentRequest extends Message<DeleteDeploymentRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string domain_name = 2;
   */
  domainName = "";

  constructor(data?: PartialMessage<DeleteDeploymentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.DeleteDeploymentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "domain_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteDeploymentRequest {
    return new DeleteDeploymentRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteDeploymentRequest {
    return new DeleteDeploymentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteDeploymentRequest {
    return new DeleteDeploymentRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteDeploymentRequest | PlainMessage<DeleteDeploymentRequest> | undefined, b: DeleteDeploymentRequest | PlainMessage<DeleteDeploymentRequest> | undefined): boolean {
    return proto3.util.equals(DeleteDeploymentRequest, a, b);
  }
}

/**
 * @generated from message kubes.DeleteDeploymentResponse
 */
export class DeleteDeploymentResponse extends Message<DeleteDeploymentResponse> {
  constructor(data?: PartialMessage<DeleteDeploymentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.DeleteDeploymentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteDeploymentResponse {
    return new DeleteDeploymentResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteDeploymentResponse {
    return new DeleteDeploymentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteDeploymentResponse {
    return new DeleteDeploymentResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteDeploymentResponse | PlainMessage<DeleteDeploymentResponse> | undefined, b: DeleteDeploymentResponse | PlainMessage<DeleteDeploymentResponse> | undefined): boolean {
    return proto3.util.equals(DeleteDeploymentResponse, a, b);
  }
}

/**
 * @generated from message kubes.ListDeploymentsRequest
 */
export class ListDeploymentsRequest extends Message<ListDeploymentsRequest> {
  /**
   * @generated from field: string namespace = 1;
   */
  namespace = "";

  constructor(data?: PartialMessage<ListDeploymentsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.ListDeploymentsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "namespace", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListDeploymentsRequest {
    return new ListDeploymentsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListDeploymentsRequest {
    return new ListDeploymentsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListDeploymentsRequest {
    return new ListDeploymentsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListDeploymentsRequest | PlainMessage<ListDeploymentsRequest> | undefined, b: ListDeploymentsRequest | PlainMessage<ListDeploymentsRequest> | undefined): boolean {
    return proto3.util.equals(ListDeploymentsRequest, a, b);
  }
}

/**
 * @generated from message kubes.ListDeploymentsResponse
 */
export class ListDeploymentsResponse extends Message<ListDeploymentsResponse> {
  /**
   * @generated from field: repeated kubes.Deployment deployments = 1;
   */
  deployments: Deployment[] = [];

  constructor(data?: PartialMessage<ListDeploymentsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.ListDeploymentsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "deployments", kind: "message", T: Deployment, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListDeploymentsResponse {
    return new ListDeploymentsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListDeploymentsResponse {
    return new ListDeploymentsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListDeploymentsResponse {
    return new ListDeploymentsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListDeploymentsResponse | PlainMessage<ListDeploymentsResponse> | undefined, b: ListDeploymentsResponse | PlainMessage<ListDeploymentsResponse> | undefined): boolean {
    return proto3.util.equals(ListDeploymentsResponse, a, b);
  }
}

/**
 * @generated from message kubes.NewDeploymentRequest
 */
export class NewDeploymentRequest extends Message<NewDeploymentRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string domain_name = 2;
   */
  domainName = "";

  constructor(data?: PartialMessage<NewDeploymentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.NewDeploymentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "domain_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NewDeploymentRequest {
    return new NewDeploymentRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NewDeploymentRequest {
    return new NewDeploymentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NewDeploymentRequest {
    return new NewDeploymentRequest().fromJsonString(jsonString, options);
  }

  static equals(a: NewDeploymentRequest | PlainMessage<NewDeploymentRequest> | undefined, b: NewDeploymentRequest | PlainMessage<NewDeploymentRequest> | undefined): boolean {
    return proto3.util.equals(NewDeploymentRequest, a, b);
  }
}

/**
 * @generated from message kubes.NewDeploymentResponse
 */
export class NewDeploymentResponse extends Message<NewDeploymentResponse> {
  /**
   * @generated from field: kubes.Deployment deployment = 1;
   */
  deployment?: Deployment;

  constructor(data?: PartialMessage<NewDeploymentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.NewDeploymentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "deployment", kind: "message", T: Deployment },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NewDeploymentResponse {
    return new NewDeploymentResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NewDeploymentResponse {
    return new NewDeploymentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NewDeploymentResponse {
    return new NewDeploymentResponse().fromJsonString(jsonString, options);
  }

  static equals(a: NewDeploymentResponse | PlainMessage<NewDeploymentResponse> | undefined, b: NewDeploymentResponse | PlainMessage<NewDeploymentResponse> | undefined): boolean {
    return proto3.util.equals(NewDeploymentResponse, a, b);
  }
}

/**
 * @generated from message kubes.Deployment
 */
export class Deployment extends Message<Deployment> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string namespace = 2;
   */
  namespace = "";

  /**
   * @generated from field: string image = 3;
   */
  image = "";

  /**
   * @generated from field: int32 replicas = 4;
   */
  replicas = 0;

  /**
   * @generated from field: string status = 5;
   */
  status = "";

  /**
   * @generated from field: string id = 6;
   */
  id = "";

  constructor(data?: PartialMessage<Deployment>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubes.Deployment";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "namespace", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "image", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "replicas", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Deployment {
    return new Deployment().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Deployment {
    return new Deployment().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Deployment {
    return new Deployment().fromJsonString(jsonString, options);
  }

  static equals(a: Deployment | PlainMessage<Deployment> | undefined, b: Deployment | PlainMessage<Deployment> | undefined): boolean {
    return proto3.util.equals(Deployment, a, b);
  }
}

