import { atom } from "recoil";

const likeCountState = atom({
  key: "likeCountState",
  default: 0,
});

export default likeCountState;
