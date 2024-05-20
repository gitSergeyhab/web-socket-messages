export type Role = "STUDENT" | "TEACHER";

export interface User {
  id: number;
  socketId: string;
  role: Role;
  name: string;
  avatar: string;
}
