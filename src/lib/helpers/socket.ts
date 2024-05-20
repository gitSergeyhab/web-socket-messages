import { Server } from "socket.io";
import {
  getFirstAvatars,
  getUsersCountInRoom,
} from "../services/db/internalВbService";

export const sendUnAuthMessage = (io: Server, socketId: string) => {
  io.to(socketId).emit(
    "error:auth",
    "Токкен неверный, либо просрочен, авторизуйтесь"
  );
};

export const sendUsersData = (io: Server, roomId: string) => {
  const roomUsersCount = getUsersCountInRoom(roomId);
  const userAvatars = getFirstAvatars(3);
  io.to(roomId).emit("users:count", roomUsersCount);
  io.to(roomId).emit("users:avatars", userAvatars);
};
