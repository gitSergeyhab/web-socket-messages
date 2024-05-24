import { Socket } from "socket.io";
import { sendUsersData } from "../lib/helpers/socket";
import { deleteUser, getRoomIdBySocketId } from "../db/internalDbService";
import { logger } from "../lib/utils/logger";

export const disconnectHandler = (socket: Socket) => {
  logger.info(`a user disconnected: ${socket.id}`);
  deleteUser(socket.id);
  const roomId = getRoomIdBySocketId(socket.id);
  if (roomId) {
    sendUsersData(roomId);
  }
};
