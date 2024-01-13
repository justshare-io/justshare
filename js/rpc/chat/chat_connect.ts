// @generated by protoc-gen-connect-es v1.3.0 with parameter "target=ts"
// @generated from file chat/chat.proto (package chat, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { BanUserRequest, BanUserResponse, Message, ReceiveMessagesRequest, SendMessageRequest, SendMessageResponse } from "./chat_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service chat.ChatService
 */
export const ChatService = {
  typeName: "chat.ChatService",
  methods: {
    /**
     * @generated from rpc chat.ChatService.SendMessage
     */
    sendMessage: {
      name: "SendMessage",
      I: SendMessageRequest,
      O: SendMessageResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc chat.ChatService.ReceiveMessages
     */
    receiveMessages: {
      name: "ReceiveMessages",
      I: ReceiveMessagesRequest,
      O: Message,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc chat.ChatService.BanUser
     */
    banUser: {
      name: "BanUser",
      I: BanUserRequest,
      O: BanUserResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

