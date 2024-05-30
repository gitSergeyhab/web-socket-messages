import { Server, Socket } from "socket.io";
import { toResponseMessages } from "../lib/utils/adapters";
import { getUserInfoAndSetToDB } from "../lib/helpers/getUserInfo";
import { sendErrorMessage, sendUsersData } from "../lib/helpers/socket";
import { getRoomMessages } from "../db/externalDbService";
import { logger } from "../lib/utils/logger";

export type JoinRoomCB = (response: {
  isJoined: boolean;
  roomId: string;
}) => void;

export const joinRoomHandler = async (
  io: Server,
  socket: Socket,
  roomId: string,
  onJoin: JoinRoomCB
) => {
  const { token } = socket.handshake.auth;
  const userInfo = await getUserInfoAndSetToDB(socket.id, roomId, token);
  if (!userInfo) {
    sendErrorMessage(socket.id, "Авторизуйтесь, чтобы войти на вебинар");
    logger.warn(
      `un auth user: ${socket.id} tried to enter the room: ${roomId}`
    );
    onJoin({ isJoined: false, roomId });
    return;
  }
  socket.join(roomId);
  logger.info(
    `user (socket/id): ${socket.id}/${userInfo.id} entered the room ${roomId}`
  );
  sendUsersData(roomId);
  const messages = await getRoomMessages(roomId, socket.id);
  if (!messages) {
    onJoin({ isJoined: true, roomId });
    return;
  }
  io.to(socket.id).emit("messages:all", toResponseMessages(messages));
  onJoin({ isJoined: true, roomId });
};
