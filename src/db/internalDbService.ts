import { User, UserWithRoom } from "../types/user";

export const userMap = new Map<string, UserWithRoom>([]);

const getUniqueRoomUsers = (roomId: string): UserWithRoom[] => {
  const dict = [...userMap.values()].reduce((acc, user) => {
    if (!acc[user.id] && roomId === user.roomId) {
      acc[user.id] = user;
    }
    return acc;
  }, {} as Record<string, UserWithRoom>);
  return Object.values(dict);
};

export const getUsersIdInRoom = (roomId: string): number[] =>
  getUniqueRoomUsers(roomId).map(({ id }) => id);

export const getFirstAvatars = (count: number, roomId: string): string[] =>
  getUniqueRoomUsers(roomId)
    .reduce((acc, { avatar }) => {
      if (avatar) acc.push(avatar);
      return acc;
    }, [] as string[])
    .slice(0, count);

export const setUser = (
  userSocketId: string,
  user: User,
  roomId: string
): void => {
  userMap.set(userSocketId, { ...user, roomId });
};

export const deleteUser = (userSocketId: string): void => {
  userMap.delete(userSocketId);
};

export const getUserBySocket = (socketId: string): UserWithRoom | undefined =>
  userMap.get(socketId);

export const getRoomIdBySocketId = (socketId: string): null | string => {
  const user = getUserBySocket(socketId);
  return user ? user.roomId : null;
};
