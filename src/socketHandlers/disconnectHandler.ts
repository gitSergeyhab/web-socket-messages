import { Socket } from "socket.io";
import { sendUsersData } from "../lib/helpers/socket";
import {
  deleteUser,
  getRoomIdBySocketId,
  getUserBySocket,
  getUsersIdInRoom,
} from "../db/internalDbService";
import { logger } from "../lib/utils/logger";

export const disconnectHandler = (socket: Socket) => {
  const user = getUserBySocket(socket.id);
  const roomId = getRoomIdBySocketId(socket.id);
  if (!roomId) {
    logger.debug(
      `disconnect: there is no room of user(socket/id) ${user?.socketId}/${user?.id}`
    );
    return;
  }
  const usersCount = getUsersIdInRoom(roomId).length;
  deleteUser(socket.id);
  sendUsersData(roomId);
  const usersCountAfter = getUsersIdInRoom(roomId).length;
  logger.debug(
    `disconnect: user count before/after: ${usersCount}/${usersCountAfter}`
  );
  logger.info(
    `disconnect: a user(socket/id) disconnected: ${user?.socketId}/${user?.id}`
  );
};
