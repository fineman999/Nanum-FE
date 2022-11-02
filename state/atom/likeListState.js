import { atom } from "recoil";

const likeListState = atom({
  key: "likeListState",
  default: [],
});

export default likeListState;
