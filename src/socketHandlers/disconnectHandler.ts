import { Server, Socket } from "socket.io";
import { sendUsersData } from "../lib/helpers/socket";
import { deleteUser, getRoomIdBySocketId } from "../db/internalВbService";

export const disconnectHandler = (io: Server, socket: Socket) => {
  console.log("A user disconnected:", socket.id);
  deleteUser(socket.id);
  const roomId = getRoomIdBySocketId(socket.id);
  if (roomId) {
    sendUsersData(io, roomId);
  }
};
