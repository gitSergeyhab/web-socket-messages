export type Role = "STUDENT" | "TEACHER";

export interface User {
  id: number;
  socketId: string;
  role: Role;
  name: string;
  avatar: string;
}
export type AuthUserData = Omit<User, "socketId">;
export type UserWithRoom = User & { roomId: string }; // у юзера всего 1 комната, не может быть одновременно 2-х вебинаров
