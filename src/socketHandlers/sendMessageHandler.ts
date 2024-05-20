import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/Message";
import { ChatDBMessage, RequestMessage } from "../types/message";
import { toResponseMessage } from "../lib/utils/adapters";
import { createNewMessage } from "../lib/services/db/externalDbService";
import { sendUnAuthMessage } from "../lib/helpers/socket";
import { getUserBySocket } from "../lib/services/db/internalВbService";

export interface SendMessageHandlerData {
  message: RequestMessage;
  roomId: string;
}

export const sendMessageHandler = async (
  io: Server,
  socketId: string,
  data: SendMessageHandlerData
) => {
  const { roomId, message } = data;
  const userInfo = getUserBySocket(socketId);
  if (!userInfo) {
    sendUnAuthMessage(io, socketId);
    return;
  }
  const newMessage = await createNewMessage({ message, roomId, userInfo });
  if (newMessage)
    io.to(data.roomId).emit("message:new", toResponseMessage(newMessage));
};
