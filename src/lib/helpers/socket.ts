import { getFirstAvatars, getUsersIdInRoom } from "../../db/internalDbService";
import { io } from "../..";

export const sendUsersData = (roomId: string): void => {
  const indexes = getUsersIdInRoom(roomId);
  const avatars = getFirstAvatars(3, roomId);
  io.to(roomId).emit("users", { indexes, avatars });
};

export const sendErrorMessage = (socketId: string, message: string): void => {
  io.to(socketId).emit("error", message);
};
