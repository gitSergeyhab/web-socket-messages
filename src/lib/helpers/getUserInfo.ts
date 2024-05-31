import { getUserBySocket, setUser } from "../../db/internalDbService";
import { ApiError } from "../../types/api";
import { UserWithRoom } from "../../types/user";
import { requestUserAuthData$ } from "../api/mainServerApi";
import { getErrorMessage } from "../api/utils";
import { logger } from "../utils/logger";

export const getUserInfoAndSetToDB = async (
  socketId: string,
  roomId: string,
  token: string
): Promise<UserWithRoom | null> => {
  const dbUser = getUserBySocket(socketId);
  if (dbUser) return dbUser;
  const msg = `room:join:getUserInfoAndSetToDB: socketId: ${socketId}, roomId: ${roomId}`;
  try {
    const { data } = await requestUserAuthData$(token);
    if (!data) {
      logger.debug(`${msg} : no user data`);
      return null;
    }
    logger.debug(`${msg}: success - data : ${JSON.stringify(data)}`);
    const user = { ...data, socketId };
    setUser(socketId, user, roomId);
    return { ...user, roomId };
  } catch (err) {
    logger.error(getErrorMessage(err as ApiError));
    return null;
  }
};
