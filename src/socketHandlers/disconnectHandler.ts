import { Server, Socket } from "socket.io";
import {
  deleteUser,
  getFirstAvatars,
  getRoomIdBySocketId,
  getUsersCountInRoom,
} from "../db/internalВbService";

export const disconnectHandler = (io: Server, socket: Socket) => {
  console.log("A user disconnected:", socket.id);
  deleteUser(socket.id);
  const roomId = getRoomIdBySocketId(socket.id);
  if (roomId) {
    const roomUsersCount = getUsersCountInRoom(roomId);
    const userAvatars = getFirstAvatars(3);
    io.to(roomId).emit("users:count", roomUsersCount);
    io.to(roomId).emit("users:avatars", userAvatars);
  }
};
