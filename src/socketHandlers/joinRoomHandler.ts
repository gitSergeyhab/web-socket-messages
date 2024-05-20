import { Server, Socket } from "socket.io";
import { User } from "../types/user";
import {
  getFirstAvatars,
  getUsersCountInRoom,
  userMap,
} from "../db/internalВbService";
import { toResponseMessages } from "../utils/adapters";
import { getRoomMessages } from "../db/externalDbService";

export interface JoinRoomHandlerData {
  user: User;
  roomId: string;
}

export const joinRoomHandler = async (
  io: Server,
  socket: Socket,
  { user, roomId }: JoinRoomHandlerData
) => {
  userMap.set(socket.id, { ...user, roomId });
  socket.join(roomId);

  const roomUsersCount = getUsersCountInRoom(roomId);
  const userAvatars = getFirstAvatars(3);
  io.to(roomId).emit("users:count", roomUsersCount);
  io.to(roomId).emit("users:avatars", userAvatars);

  const messages = await getRoomMessages(roomId);
  io.to(roomId).emit("messages:all", toResponseMessages(messages));
};
