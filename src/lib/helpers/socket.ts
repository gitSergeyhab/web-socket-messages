import {
  getFirstAvatars,
  getUsersCountInRoom,
} from "../../db/internalВbService";
import { io } from "../..";

export const sendUsersData = (roomId: string): void => {
  const roomUsersCount = getUsersCountInRoom(roomId);
  const userAvatars = getFirstAvatars(3);
  io.to(roomId).emit("users:count", roomUsersCount);
  io.to(roomId).emit("users:avatars", userAvatars);
};

export const sendErrorMessage = (socketId: string, message: string): void => {
  io.to(socketId).emit("error", message);
};
