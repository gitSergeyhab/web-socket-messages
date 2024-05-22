import { fakeRequestAuthUserData } from "../mocks/mockApi";
import { AuthUserData } from "../../types/user";
import { handledRequest } from "./utils";
// import { request } from "./api";

export const requestUserAuthData$ = (token: string): Promise<AuthUserData> =>
  fakeRequestAuthUserData(token);

// export const requestUserAuthData$ = (token: string): Promise<AuthUserData> =>
//   request.get("/users/user-info", {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const requestUserAuthData = handledRequest(
  requestUserAuthData$,
  "request user auth data error",
  null
);
