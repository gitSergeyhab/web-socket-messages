import { AuthUserData } from "../../types/user";
import { nockedAuthUserData } from "./mockData";

export const fakeRequestAuthUserData = (
  _token: string,
  fail = false
): Promise<AuthUserData> =>
  new Promise((res) => {
    setTimeout(() => {
      if (fail) {
        throw new Error("Bad User");
      }
      res(nockedAuthUserData);
    }, 200);
  });
