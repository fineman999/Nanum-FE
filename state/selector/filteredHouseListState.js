import { selector } from "recoil";
import houseFilterState from "../atom/houseFilterState";
import houseListState from "../atom/houseListState";

filteredHouseListState = selector({
  key: "filteredHouseListState",
  get: ({ get }) => {
    const filterState = get(houseFilterState);
    const listState = get(houseListState);

    // 필터 값에 따라서 리스트 정렬
  },
});

export default filteredHouseListState;
