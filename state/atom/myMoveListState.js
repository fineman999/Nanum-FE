import { atom } from "recoil";

const myMoveListState = atom({
  key: "myMoveListState",
  default: [],
});

export default myMoveListState;
