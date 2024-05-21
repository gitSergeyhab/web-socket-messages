import { Server } from "socket.io";
import {
  getFirstAvatars,
  getUsersCountInRoom,
} from "../../db/internalВbService";

export const sendUnAuthMessage = (io: Server, socketId: string): void => {
  io.to(socketId).emit(
    "error:auth",
    "Токен неверный, либо просрочен, авторизуйтесь"
  );
};

export const sendUsersData = (io: Server, roomId: string): void => {
  const roomUsersCount = getUsersCountInRoom(roomId);
  const userAvatars = getFirstAvatars(3);
  io.to(roomId).emit("users:count", roomUsersCount);
  io.to(roomId).emit("users:avatars", userAvatars);
};
