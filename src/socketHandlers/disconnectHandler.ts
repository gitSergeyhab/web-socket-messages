import { Socket } from "socket.io";
import { sendUsersData } from "../lib/helpers/socket";
import {
  deleteUser,
  getRoomIdBySocketId,
  getUserBySocket,
  getUsersCountInRoom,
} from "../db/internalDbService";
import { logger } from "../lib/utils/logger";

export const disconnectHandler = (socket: Socket) => {
  const user = getUserBySocket(socket.id);
  const roomId = getRoomIdBySocketId(socket.id);
  if (!roomId) {
    logger.warn(`disconnect: there is no room of user ${socket.id}`);
    return;
  }
  const usersCount = getUsersCountInRoom(roomId);
  logger.debug(
    `disconnect: a user disconnected: ${socket.id}/${user?.first_name} ${user?.last_name}`
  );
  logger.info(`disconnect: user count before: ${usersCount}`);
  deleteUser(socket.id);
  sendUsersData(roomId);

  const usersCountAfter = getUsersCountInRoom(roomId);
  logger.debug(`disconnect: user count after: ${usersCountAfter}`);
  logger.info(`disconnect: a user disconnected: ${socket.id}`);
};
