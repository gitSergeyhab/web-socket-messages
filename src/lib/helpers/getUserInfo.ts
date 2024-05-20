import { UserWithRoom } from "../../types/user";
import { requestUserAuthData$ } from "../api/mainServerApi";
import { getUserBySocket, setUser } from "../services/db/internalВbService";

export const getUserInfoAndSetToDB = async (
  socketId: string,
  roomId: string,
  token: string
): Promise<UserWithRoom | null> => {
  const dbUser = getUserBySocket(socketId);
  if (dbUser) return dbUser;
  try {
    const requestedUser = await requestUserAuthData$(token);
    const user = { ...requestedUser, socketId };
    setUser(socketId, user, roomId);
    return { ...user, roomId };
  } catch (err) {
    console.error("There is no user with such token");
    return null;
  }
};
