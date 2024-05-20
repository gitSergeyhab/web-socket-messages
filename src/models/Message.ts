import mongoose from "mongoose";
import { BaseMessage, ChatDBMessage } from "../types/message";

const { Schema, model, Document } = mongoose;

export interface BaseMessageDocument extends BaseMessage, Document {}

const BaseMessageSchema = new Schema<BaseMessageDocument>({
  text: { type: String, required: true },
  userName: { type: String, required: true },
  userRole: { type: String, enum: ["STUDENT", "TEACHER"], required: true },
  userId: { type: Number, required: true },
});

export interface ChatMessageDocument extends ChatDBMessage, Document {}

const MessageSchema = new Schema<ChatMessageDocument>({
  text: { type: String, required: true },
  userName: { type: String, required: true },
  userRole: { type: String, enum: ["STUDENT", "TEACHER"], required: true },
  datetime: { type: Date, default: Date.now, required: true }, // Использование Date и установка значения по умолчанию
  commentedMessage: { type: BaseMessageSchema, required: false },
  isDeleted: { type: Boolean, default: false },
  userId: { type: Number, required: true },
  roomId: { type: String, required: true },
});

export const MessageModel = model<ChatMessageDocument>(
  "Message",
  MessageSchema
);
