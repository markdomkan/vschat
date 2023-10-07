import { Channel } from "@slack/web-api/dist/response/ConversationsListResponse";

export type Commands = {
  GET_CHANNEL_LIST: {
    args: undefined;
    response: Channel[];
  };
  JOIN_CHANNEL: {
    args: { channelId: string };
    response: undefined;
  };
};

export type CommandRequest = {
  id: string;
  command: keyof Commands;
  args: Commands[keyof Commands]["args"];
};

export type CommandResponse<T extends keyof Commands> = {
  id: string;
  response: Commands[T]["response"];
  error?: Error;
};
