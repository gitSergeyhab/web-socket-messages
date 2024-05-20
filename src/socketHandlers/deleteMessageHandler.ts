import { Server } from "socket.io";
import { deleteMessage } from "../lib/services/db/externalDbService";
import { sendUnAuthMessage } from "../lib/helpers/socket";
import { getUserBySocket } from "../lib/services/db/internalВbService";

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
