import { AuthUserData } from "../../types/user";
import { request } from "./api";

export const requestUserAuthData$ = (
  token: string
): Promise<{ data: AuthUserData }> =>
  request.get("/user/info/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
