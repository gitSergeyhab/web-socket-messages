import { Server, Socket } from "socket.io";
import { toResponseMessages } from "../lib/utils/adapters";
import { getUserInfoAndSetToDB } from "../lib/helpers/getUserInfo";
import { sendUnAuthMessage, sendUsersData } from "../lib/helpers/socket";
import { getRoomMessages } from "../db/externalDbService";

export interface JoinRoomHandlerData {
  roomId: string;
  token: string;
}

export const joinRoomHandler = async (
  io: Server,
  socket: Socket,
  { roomId, token }: JoinRoomHandlerData
) => {
  if (process.env.MONGO_URI) {
    io.to(roomId).emit("message:new", {
      id: "22",
      text: "MONGO_URI exists ++++++++++++++++++",
      userName: "string",
      userRole: "TEACHER",
      userId: 123,
    });
  } else {
    io.to(roomId).emit("message:new", {
      id: "22",
      text: "MONGO_URI NOT exists ------------",
      userName: "string",
      userRole: "TEACHER",
      userId: 123,
    });
  }
  const userInfo = await getUserInfoAndSetToDB(socket.id, roomId, token);
  if (!userInfo) {
    sendUnAuthMessage(io, socket.id);
    return;
  }
  socket.join(roomId);
  sendUsersData(io, roomId);
  const messages = await getRoomMessages(roomId);
  io.to(roomId).emit("messages:all", toResponseMessages(messages));
};
