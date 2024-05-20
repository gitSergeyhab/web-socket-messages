import { Types } from "mongoose";
import { BaseMessageDocument, ChatMessageDocument } from "../../models/Message";
import { ResponseCommentedMessage, ResponseMessage } from "../../types/message";

type CommentedMessage =
  | (BaseMessageDocument & {
      _id: Types.ObjectId;
    })
  | undefined;
export const toResponseCommentedMessage = (
  dbMessage: CommentedMessage
): ResponseCommentedMessage | undefined => {
  if (!dbMessage) return;
  const { text, userName, userRole, userId, _id } = dbMessage;
  return {
    text,
    userName,
    userRole,
    userId,
    id: _id.toString(),
  };
};

export const toResponseMessage = (
  dbMessage: ChatMessageDocument & {
    _id: Types.ObjectId;
  }
): ResponseMessage => {
  const { text, datetime, userName, userRole, userId, commentedMessage, _id } =
    dbMessage;
  return {
    text,
    datetime,
    userName,
    userRole,
    userId,
    commentedMessage: toResponseCommentedMessage(
      commentedMessage as CommentedMessage
    ),
    id: _id.toString(),
  };
};

export const toResponseMessages = (
  dbMessages: (ChatMessageDocument & {
    _id: Types.ObjectId;
  })[]
): ResponseMessage[] => dbMessages.map(toResponseMessage);
