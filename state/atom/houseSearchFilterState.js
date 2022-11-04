import { atom } from "recoil";

// 전체(ALL)
// 남녀공용(COMMON)
// 남성전용(MALE)
// 여성전용(FEMALE)
// 리뷰 개수 오름/내림차순(REVIEW_CNT_ASCE, REVIEW_CNT_DESC)
// 리뷰 평점 오름/내림차순(REVIEW_AVG_ASCE, REVIEW_AVG_DESC)
// 월세 최저가 오름/내림차순 (MINIMUM_ASCE, MINIMUM_DESC)
// 월세 최고가 오름/내림차순 (MAXIMUM_ASCE, MAXIMUM_DESC)
// 좋아요(LIKE)

const houseSearchFilterState = atom({
  key: "houseSearchFilterState",
  default: "ALL",
});

export default houseSearchFilterState;
