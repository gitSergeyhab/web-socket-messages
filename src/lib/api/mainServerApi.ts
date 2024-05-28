import { AuthUserData } from "../../types/user";
import { request } from "./api";
import { handledRequest } from "./utils";

export const requestUserAuthData$ = (
  token: string
): Promise<{ data: AuthUserData }> =>
  request.get("/user/info/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const requestUserAuthData = handledRequest(
  requestUserAuthData$,
  "request user auth data error",
  null
);
