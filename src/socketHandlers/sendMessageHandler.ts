import { Server } from "socket.io";
import { RequestMessage } from "../types/message";
import { toResponseMessage } from "../lib/utils/adapters";
import { sendErrorMessage } from "../lib/helpers/socket";
import { getUserBySocket } from "../db/internalDbService";
import { createNewMessage } from "../db/externalDbService";
import { logger } from "../lib/utils/logger";

export interface SendMessageData {
  message: RequestMessage;
  roomId: string;
}

export type OnReceived = (response: {
  isReceived: boolean;
  ok: boolean;
}) => void;

export const sendMessageHandler = async (
  io: Server,
  socketId: string,
  data: SendMessageData,
  onReceived: OnReceived
) => {
  const { roomId, message } = data;
  const userInfo = getUserBySocket(socketId);
  if (!userInfo) {
    sendErrorMessage(socketId, "Авторизуйтесь, чтобы добавлять сообщения");
    logger.warn(
      `un auth user: ${socketId} tried to send the message: ${message.text}`
    );
    onReceived({ isReceived: true, ok: false });
    return;
  }
  const newMessage = await createNewMessage({
    message,
    roomId,
    userInfo,
    socketId,
  });
  if (!newMessage) {
    onReceived({ isReceived: true, ok: false });
    return;
  }
  io.to(data.roomId).emit("message:new", toResponseMessage(newMessage));
  onReceived({ isReceived: true, ok: true });
};
