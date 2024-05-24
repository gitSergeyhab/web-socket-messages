import { AuthUserData, UserWithRoom } from "../../types/user";

export const avatars = {
  Hitchcock:
    "https://pic.rutubelist.ru/video/e2/42/e24255c3eca77fc98f65ce7c3d857e7c.jpg",
  Chaplin:
    "https://s6.cdn.eg.ru/wp-content/uploads/2017/12/charli-chaplin092718.jpg",
  Hepburn:
    "https://mykaleidoscope.ru/uploads/posts/2022-06/1656469709_2-mykaleidoscope-ru-p-makiyazh-odri-khepbern-devushka-krasivo-fo-2.jpg",
  Kelly: "https://yobte.ru/uploads/posts/2020-01/grejs-kelli-68-foto-38.jpg",
};

export const createMockedAuthUser = (
  user: Partial<AuthUserData> = {}
): AuthUserData => ({
  avatar:
    "https://s6.cdn.eg.ru/wp-content/uploads/2017/12/charli-chaplin092718.jpg",
  id: 12,
  first_name: "Чарльз",
  last_name: "Чаплин",
  role: "STUDENT",
  ...user,
});

export const mockedAuthUserData = createMockedAuthUser();

export const createMockedUserWithRoom = (
  user: Partial<UserWithRoom> = {}
): UserWithRoom => ({
  ...mockedAuthUserData,
  roomId: "1",
  socketId: "any",
  ...user,
});

export const mockedUserWithRoom = createMockedUserWithRoom();
type UserWithRoomFroMap = [string, UserWithRoom];

const mockedUsersInRoom3: UserWithRoomFroMap[] = Object.entries(avatars).map(
  ([name, img], i) => [
    name,
    createMockedUserWithRoom({
      avatar: img,
      id: i,
      socketId: name,
      roomId: "3",
    }),
  ]
);

const mockedUsersInRoom1: UserWithRoomFroMap[] = [
  ["Чарльз", mockedUserWithRoom],
  [
    "Hitchcock",
    createMockedUserWithRoom({
      avatar: avatars.Hitchcock,
      id: 2,
      socketId: avatars.Hitchcock,
    }),
  ],
];

export const usersInRooms = [...mockedUsersInRoom3, ...mockedUsersInRoom1];
