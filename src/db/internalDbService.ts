// import { usersInRooms } from "../lib/mocks/mockData"; // TODO для теста блока views на клиенте. убрать, когда юзер сможет добавлять себе аватарки
import { User, UserWithRoom } from "../types/user";

export const userMap = new Map<string, UserWithRoom>([]);

export const getUsersCountInRoom = (roomId: string): number =>
  [...userMap.values()].filter((item) => item.roomId === roomId).length;

export const getFirstAvatars = (count: number, roomId: string): string[] =>
  [...userMap.values()]
    .filter((item) => item.avatar && item.roomId === roomId)
    .slice(0, count)
    .map((item) => item.avatar);

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
