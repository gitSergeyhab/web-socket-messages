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
  if (process.env.MONGO_URI) {
    io.to(data.roomId).emit("message:new", {
      id: "22",
      text: "MONGO_URI exists ++++++++++++++++++",
      userName: "string",
      userRole: "TEACHER",
      userId: 123,
    });
  } else {
    io.to(data.roomId).emit("message:new", {
      id: "22",
      text: "MONGO_URI NOT exists ------------",
      userName: "string",
      userRole: "TEACHER",
      userId: 123,
    });
  }
  const { roomId, message } = data;
  const userInfo = getUserBySocket(socketId);
  if (!userInfo) {
    sendUnAuthMessage(io, socketId);
    return;
  }
  const newMessage = await createNewMessage({ message, roomId, userInfo });
  if (newMessage) {
    io.to(data.roomId).emit("message:new", toResponseMessage(newMessage));
  } else {
    io.to(data.roomId).emit("message:new", {
      id: "22",
      text: "string",
      userName: "string",
      userRole: "TEACHER",
      userId: 123,
    });
  }
};
