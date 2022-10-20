import { atom } from "recoil";

// 투어 신청 필터링 상태
const tourFilterState = atom({
  key: "tourFilterState",
  default: "ALL",
});

export default tourFilterState;
