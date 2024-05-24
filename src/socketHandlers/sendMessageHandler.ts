import { Server } from "socket.io";
import { RequestMessage } from "../types/message";
import { toResponseMessage } from "../lib/utils/adapters";
import { sendErrorMessage } from "../lib/helpers/socket";
import { getUserBySocket } from "../db/internalDbService";
import { createNewMessage } from "../db/externalDbService";
import { logger } from "../lib/utils/logger";

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
    sendErrorMessage(socketId, "Авторизуйтесь, чтобы добавлять сообщения");
    logger.warn(
      `un auth user: ${socketId} tried to send the message: ${message.text}`
    );
    return;
  }
  const newMessage = await createNewMessage({
    message,
    roomId,
    userInfo,
    socketId,
  });
  if (newMessage) {
    io.to(data.roomId).emit("message:new", toResponseMessage(newMessage));
  }
};
