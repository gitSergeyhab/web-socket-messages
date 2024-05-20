import { Server } from "socket.io";
import { deleteMessage } from "../db/externalDbService";

export interface DeleteMessageHandlerData {
  roomId: string;
  messageId: string;
}
export const deleteMessageHandler = async (
  io: Server,
  data: DeleteMessageHandlerData
) => {
  const { messageId, roomId } = data;
  await deleteMessage(messageId);
  io.to(roomId).emit("message:delete", messageId);
};
