import { Server, Socket } from "socket.io";
import { JoinRoomHandlerData, joinRoomHandler } from "./joinRoomHandler";
import { disconnectHandler } from "./disconnectHandler";
import {
  SendMessageHandlerData,
  sendMessageHandler,
} from "./sendMessageHandler";
import {
  DeleteMessageHandlerData,
  deleteMessageHandler,
} from "./deleteMessageHandler";
import { logger } from "../lib/utils/logger";

export const connectionHandler = (io: Server, socket: Socket) => {
  logger.info(`a user connected: ${socket.id}`);

  socket.on(
    "room:join",
    async (data: JoinRoomHandlerData) => await joinRoomHandler(io, socket, data)
  );
  socket.on(
    "message:send",
    async (data: SendMessageHandlerData) =>
      await sendMessageHandler(io, socket.id, data)
  );
  socket.on(
    "message:delete",
    async (data: DeleteMessageHandlerData) =>
      await deleteMessageHandler(io, socket.id, data)
  );

  socket.on("disconnect", () => disconnectHandler(socket));
};
