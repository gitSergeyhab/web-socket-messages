import { Server, Socket } from "socket.io";
import { User } from "../types/user";
import {
  getFirstAvatars,
  getUsersCountInRoom,
  userMap,
} from "../lib/services/db/internalВbService";
import { toResponseMessages } from "../lib/utils/adapters";
import { getRoomMessages } from "../lib/services/db/externalDbService";
import { getUserInfoAndSetToDB } from "../lib/helpers/getUserInfo";
import { sendUnAuthMessage, sendUsersData } from "../lib/helpers/socket";

export interface JoinRoomHandlerData {
  roomId: string;
  token: string;
}

export const joinRoomHandler = async (
  io: Server,
  socket: Socket,
  { roomId, token }: JoinRoomHandlerData
) => {
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
