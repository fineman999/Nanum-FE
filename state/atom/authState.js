import { atom } from "recoil";

const authState = atom({
  key: `authState`,
  default: {
    isAuth: true,
    username: "노숙자",
  },
});

export default authState;
