import { ProtoflowService } from "@/rpc/protoflow_connect";
import { ContentService } from "@/rpc/content/content_connect";
import { UserService } from "@/rpc/user/user_connect";
import {ChatService} from "@/rpc/chat/chat_connect";
import {EventService} from "@/rpc/event/event_connect";
import {createConnectTransport} from "@connectrpc/connect-web";
import {createPromiseClient} from "@connectrpc/connect";
import {KubesService} from "@/rpc/kubes/kubes_connect";

export const baseURL = process.env.BASE_URL;

export const transport = createConnectTransport({
  baseUrl: `/api`,
  // credentials: "include",
});

export const projectService = createPromiseClient(ProtoflowService, transport);
export const contentService = createPromiseClient(ContentService, transport);
export const userService = createPromiseClient(UserService, transport);
export const chatService = createPromiseClient(ChatService, transport);
export const eventService = createPromiseClient(EventService, transport);
export const kubesService = createPromiseClient(KubesService, transport);

// extension needs full url to connect to the server
export const extTransport = createConnectTransport({
  baseUrl: `${baseURL}/api` || 'error',
  // credentials: "include",
});

export const extUserService = createPromiseClient(UserService, extTransport);
export const extContentService = createPromiseClient(ContentService, extTransport);
