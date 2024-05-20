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
  userName: string;
  userRole: Role;
  commentedMessage?: BaseMessage;
}

export interface ResponseMessage extends BaseMessage {
  commentedMessage?: BaseMessage;
  datetime: Date;
  id: string;
}

export interface ResponseCommentedMessage extends BaseMessage {
  id: string;
}
