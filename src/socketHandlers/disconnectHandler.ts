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
    logger.warn(`disconnect: there is no room of user ${user}`);
    return;
  }
  const usersCount = getUsersCountInRoom(roomId);
  deleteUser(socket.id);
  sendUsersData(roomId);
  const usersCountAfter = getUsersCountInRoom(roomId);
  logger.debug(
    `disconnect: user count before/after: ${usersCount}/${usersCountAfter}`
  );
  logger.info(`disconnect: a user disconnected: ${user}`);
};
