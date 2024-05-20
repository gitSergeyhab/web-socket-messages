import { AuthUserData } from "../../types/user";

export const createMockedAuthUser = (
  user: Partial<AuthUserData> = {}
): AuthUserData => ({
  avatar:
    "https://s6.cdn.eg.ru/wp-content/uploads/2017/12/charli-chaplin092718.jpg",
  id: 12,
  name: "Чарльз Спенсер Чаплин",
  role: "STUDENT",
  ...user,
});

export const nockedAuthUserData = createMockedAuthUser();
