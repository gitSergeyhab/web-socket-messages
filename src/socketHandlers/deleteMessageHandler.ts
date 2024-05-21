import { Server } from "socket.io";
import { sendUnAuthMessage } from "../lib/helpers/socket";
import { getUserBySocket } from "../db/internalВbService";
import { deleteMessage } from "../db/externalDbService";

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
    sendUnAuthMessage(io, socketId);
    return;
  }

  await deleteMessage(messageId);
  io.to(roomId).emit("message:delete", messageId);
};
