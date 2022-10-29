import { selector } from "recoil";
import myMoveFilterState from "../atom/myMoveFilterState";
import myMoveListState from "../atom/myMoveListState";

const filteredMyMoveListState = selector({
  key: "filteredMyMoveListState",
  get: ({ get }) => {
    const filterState = get(myMoveFilterState);
    const myMoveList = get(myMoveListState);

    switch (filterState) {
      case "WAITING":
        return myMoveList.filter(
          (listItem) => listItem.moveInStatus === "WAITING"
        );
        break;
      case "REJECTED":
        return myMoveList.filter(
          (listItem) => listItem.moveInStatus === "REJECTED"
        );
        break;
      case "CANCELED":
        return myMoveList.filter(
          (listItem) => listItem.moveInStatus === "CANCELED"
        );
        break;
      case "CONTRACTING":
        return myMoveList.filter(
          (listItem) => listItem.moveInStatus === "CONTRACTING"
        );
        break;
      case "CONTRACT_COMPLETED":
        return myMoveList.filter(
          (listItem) => listItem.moveInStatus === "CONTRACT_COMPLETED"
        );
        break;
      default:
        return myMoveList;
    }
  },
});

export default filteredMyMoveListState;
