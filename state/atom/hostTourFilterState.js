import { atom } from "recoil";

const hostTourFilterState = atom({
  key: "hostTourFilterState",
  default: "ALL",
});

export default hostTourFilterState;
