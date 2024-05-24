import { getUserBySocket, setUser } from "../../db/internalDbService";
import { UserWithRoom } from "../../types/user";
import { requestUserAuthData } from "../api/mainServerApi";

export const getUserInfoAndSetToDB = async (
  socketId: string,
  roomId: string,
  token: string
): Promise<UserWithRoom | null> => {
  const dbUser = getUserBySocket(socketId);
  if (dbUser) return dbUser;
  const requestedUser = await requestUserAuthData(token);
  if (!requestedUser) return null;
  const user = { ...requestedUser, socketId };
  setUser(socketId, user, roomId);
  return { ...user, roomId };
};
