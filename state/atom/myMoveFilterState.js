import { atom } from "recoil";

const myMoveFilterState = atom({
  key: "myMoveFilterState",
  default: "ALL",
});

export default myMoveFilterState;
