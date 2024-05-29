import { Server, Socket } from "socket.io";
import { joinRoomHandler } from "./joinRoomHandler";
import { disconnectHandler } from "./disconnectHandler";
import { sendMessageHandler } from "./sendMessageHandler";
import { deleteMessageHandler } from "./deleteMessageHandler";
import { logger } from "../lib/utils/logger";

export const connectionHandler = (io: Server, socket: Socket) => {
  logger.info(`a user connected: ${socket.id}`);

  socket.on(
    "room:join",
    async (data, onJoin) => await joinRoomHandler(io, socket, data, onJoin)
  );
  socket.on(
    "message:send",
    async (data, onReceived) =>
      await sendMessageHandler(io, socket.id, data, onReceived)
  );
  socket.on(
    "message:delete",
    async (data) => await deleteMessageHandler(io, socket.id, data)
  );

  socket.on("disconnect", () => disconnectHandler(socket));
};
