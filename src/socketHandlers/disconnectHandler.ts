import { Server, Socket } from "socket.io";
import {
  deleteUser,
  getRoomIdBySocketId,
} from "../lib/services/db/internalВbService";
import { sendUsersData } from "../lib/helpers/socket";

export const disconnectHandler = (io: Server, socket: Socket) => {
  console.log("A user disconnected:", socket.id);
  deleteUser(socket.id);
  const roomId = getRoomIdBySocketId(socket.id);
  if (roomId) {
    sendUsersData(io, roomId);
  }
};
