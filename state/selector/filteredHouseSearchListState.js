import { selector } from "recoil";
import houseSearchFilterState from "../atom/houseSearchFilterState";
import houseSearchListState from "../atom/houseSearchListState";

const filteredHouseSearchListState = selector({
  key: "filteredHouseListState",
  get: ({ get }) => {
    const houseSearchFilter = get(houseSearchFilterState);
    const houseSearchList = get(houseSearchListState);

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
      case "REVIEW":
        return [];
        break;
      case "MINIMUM":
        return [];
        break;
      case "MAXIMUM":
        return [];
        break;
      case "LIKE":
        return [];
        break;
      default:
        return houseSearchList;
    }
  },
});

export default filteredHouseSearchListState;
