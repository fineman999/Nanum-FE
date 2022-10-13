import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // this key is using to store data in local storage
  storage: typeof window !== "undefined" ? localStorage : "", // configurate which stroage will be used to store the data
});

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
  effects_UNSTABLE: [persistAtom],
});

export const authState = atom({
  key: "authState",
  default: {
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
