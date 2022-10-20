import { selector } from "recoil";
import tourFilterState from "../atom/tourFilterState";
import tourListState from "../atom/tourListState";

const filteredTourListState = selector({
  key: "filteredTourListState",
  get: ({ get }) => {
    const tourFilter = get(tourFilterState);
    const tourList = get(tourListState);

    switch (tourFilter) {
      case "WAITING":
        return tourList.filter(
          (listItem) => listItem.houseTourStatus === "WAITING"
        );
        break;
      case "APPROVED":
        return tourList.filter(
          (listItem) => listItem.houseTourStatus === "APPROVED"
        );
        break;
      case "REJECTED":
        return tourList.filter(
          (listItem) => listItem.houseTourStatus === "REJECTED"
        );
        break;
      case "CANCELED":
        return tourList.filter(
          (listItem) => listItem.houseTourStatus === "CANCELED"
        );
        break;
      case "TOUR_COMPLETED":
        return tourList.filter(
          (listItem) => listItem.houseTourStatus === "TOUR_COMPLETED"
        );
        break;
      default:
        return tourList;
    }
  },
});

export default filteredTourListState;
