import { Server } from "socket.io";
import { RequestMessage } from "../types/message";
import { toResponseMessage } from "../lib/utils/adapters";
import { sendUnAuthMessage } from "../lib/helpers/socket";
import { getUserBySocket } from "../db/internalВbService";
import { createNewMessage } from "../db/externalDbService";

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
  io.emit(
    "log",
    `!___________process.env.MONGO: ${process.env.MONGO}, TEST: ${process.env.TEST}`
  );
  if (!userInfo) {
    sendUnAuthMessage(io, socketId);
    return;
  }
  const newMessage = await createNewMessage({ message, roomId, userInfo });
  if (newMessage) {
    io.to(data.roomId).emit("message:new", toResponseMessage(newMessage));
  }
};
