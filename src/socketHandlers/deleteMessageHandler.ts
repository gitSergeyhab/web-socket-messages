import { Server } from "socket.io";
import { sendErrorMessage } from "../lib/helpers/socket";
import { getUserBySocket } from "../db/internalDbService";
import { deleteMessage } from "../db/externalDbService";
import { logger } from "../lib/utils/logger";

export interface DeleteMessageHandlerData {
  roomId: string;
  messageId: string;
}
export const deleteMessageHandler = async (
  io: Server,
  socketId: string,
  data: DeleteMessageHandlerData
) => {
  const { messageId, roomId } = data;
  const userInfo = getUserBySocket(socketId);

  if (!userInfo) {
    sendErrorMessage(socketId, "Авторизуйтесь, чтобы удалять сообщения");
    logger.warn(
      `un auth user: ${socketId} tried to delete the message: ${messageId}`
    );
    return;
  }

  await deleteMessage(messageId, socketId);
  io.to(roomId).emit("message:delete", messageId);
};
