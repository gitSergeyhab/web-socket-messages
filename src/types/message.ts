import { Role } from "./user";

export interface BaseMessage {
  text: string;
  userName: string;
  userRole: Role;
  userId: number;
}

export interface ChatDBMessage extends BaseMessage {
  commentedMessage?: BaseMessage;
  datetime: Date;
  roomId: string;
  isDeleted: boolean;
}

export interface RequestMessage {
  text: string;
  commentedMessage?: BaseMessage;
}

export interface ResponseCommentedMessage extends BaseMessage {
  id: string;
}
export interface ResponseMessage extends BaseMessage {
  commentedMessage?: ResponseCommentedMessage;
  datetime: Date;
  id: string;
}
