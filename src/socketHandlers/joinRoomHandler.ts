import { Server, Socket } from "socket.io";
import { toResponseMessages } from "../lib/utils/adapters";
import { getUserInfoAndSetToDB } from "../lib/helpers/getUserInfo";
import { sendErrorMessage, sendUsersData } from "../lib/helpers/socket";
import { getRoomMessages } from "../db/externalDbService";
import { logger } from "../lib/utils/logger";

export interface JoinRoomHandlerData {
  roomId: string;
  token: string;
}

export const joinRoomHandler = async (
  io: Server,
  socket: Socket,
  { roomId, token }: JoinRoomHandlerData
) => {
  const userInfo = await getUserInfoAndSetToDB(socket.id, roomId, token);
  if (!userInfo) {
    sendErrorMessage(socket.id, "Авторизуйтесь, чтобы войти на вебинар");
    logger.warn(
      `un auth user: ${socket.id} tried to enter the room: ${roomId}`
    );
    return;
  }
  socket.join(roomId);
  logger.info(`user: ${socket.id} entered the room ${roomId}`);
  sendUsersData(roomId);
  const messages = await getRoomMessages(roomId, socket.id);
  io.to(roomId).emit("messages:all", toResponseMessages(messages));
};
