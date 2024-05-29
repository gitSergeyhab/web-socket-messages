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
  const msg = `getUserInfoAndSetToDB: socketId: ${socketId}, roomId: ${roomId}, token: ${token}`;
  try {
    const { data } = await requestUserAuthData$(token);
    if (!data) {
      logger.debug(`success - no data: ${msg}`);
      return null;
    }
    logger.debug(`success - data: ${msg}, data : ${JSON.stringify(data)}`);
    const user = { ...data, socketId };
    setUser(socketId, user, roomId);
    return { ...user, roomId };
  } catch (err) {
    logger.debug(`error: $${msg}`);
    logger.error(getErrorMessage(err as ApiError));
    return null;
  }
};
