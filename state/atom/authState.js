import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: 0,
    email: "",
    nickName: "",
    phone: "",
    profileImgUrl: "",
    gender: "",
    noteReject: "",
    createAt: "",
  },
});

export const authState = atom({
  key: "authState",
  default: {
    isLogin: false,
  },
});
