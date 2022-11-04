import { selector } from "recoil";
import houseSearchFilterState from "../atom/houseSearchFilterState";
import houseSearchListState from "../atom/houseSearchListState";

const filteredHouseSearchListState = selector({
  key: "filteredHouseListState",
  get: ({ get }) => {
    const houseSearchFilter = get(houseSearchFilterState);
    const houseSearchList = get(houseSearchListState);

    let nextHouseSearchList;
    // 필터 값에 따라서 리스트 정렬
    switch (houseSearchFilter) {
      case "COMMON":
        return houseSearchList.filter(
          (listItem) => listItem.houseGender === "COMMON"
        );
        break;
      case "MALE":
        return houseSearchList.filter(
          (listItem) => listItem.houseGender === "MALE"
        );
        break;
      case "FEMALE":
        return houseSearchList.filter(
          (listItem) => listItem.houseGender === "FEMALE"
        );
        break;
      case "REVIEW": // 리뷰 평점 내림차순
        nextHouseSearchList = [...houseSearchList];
        // const asceFunc = (a, b) => {}; 오름차순
        const reviewSortDescFunc = (a, b) => {
          if (a.reviewAvg > b.reviewAvg) {
            return -1;
          } else if (a.reviewAvg < b.reviewAvg) {
            return 1;
          } else {
            return 0;
          }
        };
        return nextHouseSearchList.sort(reviewSortDescFunc);
        break;
      case "MINIMUM": // 월세 최고가 내림차순
        nextHouseSearchList = [...houseSearchList];
        const rentSortAsceFunc = (a, b) => {
          if (a.maxMonthlyRent > b.maxMonthlyRent) {
            return 1;
          } else if (a.maxMonthlyRent < b.maxMonthlyRent) {
            return -1;
          } else {
            return 0;
          }
        };
        return nextHouseSearchList.sort(rentSortAsceFunc);
        break;
      case "MAXIMUM": // 월세 최고가 내림차순
        nextHouseSearchList = [...houseSearchList];
        const rentSortDescFunc = (a, b) => {
          if (a.maxMonthlyRent > b.maxMonthlyRent) {
            return -1;
          } else if (a.maxMonthlyRent < b.maxMonthlyRent) {
            return 1;
          } else {
            return 0;
          }
        };
        return nextHouseSearchList.sort(rentSortDescFunc);
        break;
      case "LIKE":
        return houseSearchList.filter((listItem) => listItem.wishId !== null);
        break;
      default:
        return houseSearchList;
    }
  },
});

export default filteredHouseSearchListState;
