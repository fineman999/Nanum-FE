import { atom } from "recoil";

// 전체(ALL)
// 남녀공용(COMMON)
// 남성전용(MALE)
// 여성전용(FEMALE)
// 리뷰순(REVIEW)
// 최저가(MINIMUM)
// 최고가(MAXIMUM)
// 좋아요(LIKE)

const houseSearchFilterState = atom({
  key: "houseSearchFilterState",
  default: "ALL",
});

export default houseSearchFilterState;
