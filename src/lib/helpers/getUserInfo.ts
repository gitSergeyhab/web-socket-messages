import { getUserBySocket, setUser } from "../../db/internalDbService";
import { UserWithRoom } from "../../types/user";
import { requestUserAuthData$ } from "../api/mainServerApi";

export const getUserInfoAndSetToDB = async (
  socketId: string,
  roomId: string,
  token: string
): Promise<UserWithRoom | null> => {
  const dbUser = getUserBySocket(socketId);
  if (dbUser) return dbUser;
  try {
    const { data } = await requestUserAuthData$(token);
    if (!data) return null;
    const user = { ...data, socketId };
    setUser(socketId, user, roomId);
    return { ...user, roomId };
  } catch (err) {
    console.error({ err });
    return null;
  }
};
