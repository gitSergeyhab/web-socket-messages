import { Server, Socket } from "socket.io";
import { JoinRoomHData, joinRoomHandler } from "./joinRoomHandler";
import { disconnectHandler } from "./disconnectHandler";
import { SendMessageData, sendMessageHandler } from "./sendMessageHandler";
import {
  DeleteMessageData,
  deleteMessageHandler,
} from "./deleteMessageHandler";
import { logger } from "../lib/utils/logger";

export const connectionHandler = (io: Server, socket: Socket) => {
  logger.info(`a user connected: ${socket.id}`);

  socket.on(
    "room:join",
    async (data: JoinRoomHData) => await joinRoomHandler(io, socket, data)
  );
  socket.on(
    "message:send",
    async (data: SendMessageData) =>
      await sendMessageHandler(io, socket.id, data)
  );
  socket.on(
    "message:delete",
    async (data: DeleteMessageData) =>
      await deleteMessageHandler(io, socket.id, data)
  );

  socket.on("disconnect", () => disconnectHandler(socket));
};
