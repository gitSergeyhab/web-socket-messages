import { fakeRequestAuthUserData } from "../mocks/mockApi";
import { AuthUserData } from "../../types/user";
import { request } from "./api";

export const requestUserAuthData$ = (token: string): Promise<AuthUserData> =>
  fakeRequestAuthUserData(token);

// export const requestUserAuthData$ = (token: string): Promise<AuthUserData> =>
//   request.get("/users/user-info");
