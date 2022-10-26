import { atom } from "recoil";

const houseListState = atom({
  key: "houseListState",
  default: [],
});

export default houseListState;
