import { atom } from "recoil";

const tourListState = atom({
  key: "tourListState",
  default: [],
});

export default tourListState;
