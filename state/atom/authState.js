import { atom } from "recoil";

const authState = atom({
  key: `authState`,
  default: {
    isAuth: false,
    username: "노숙자",
  },
});

export default authState;
