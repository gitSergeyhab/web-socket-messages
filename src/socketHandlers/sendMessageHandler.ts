import { Server } from "socket.io";
import { MessageModel } from "../models/Message";
import { RequestMessage } from "../types/message";
import { toResponseMessage } from "../utils/adapters";
import { createNewMessage } from "../db/externalDbService";

export interface SendMessageHandlerData {
  message: RequestMessage;
  roomId: string;
  userId: number;
}

export const sendMessageHandler = async (
  io: Server,
  data: SendMessageHandlerData
) => {
  const { message, roomId, userId } = data;
  const newMessage = await createNewMessage({ message, roomId, userId });
  if (newMessage)
    io.to(data.roomId).emit("message:new", toResponseMessage(newMessage));
};
