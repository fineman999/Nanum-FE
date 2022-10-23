import { atom } from "recoil";

const hostTourListState = atom({
  key: "hostTourListState",
  default: [],
});

export default hostTourListState;
