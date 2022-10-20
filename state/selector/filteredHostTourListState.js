import { selector } from "recoil";
import hostTourFilterState from "../atom/hostTourFilterState";
import hostTourListState from "../atom/hostTourListState";

const filteredHostTourListState = selector({
  key: "filteredHostTourListState",
  get: ({ get }) => {
    const hostTourFilter = get(hostTourFilterState);
    const hostTourList = get(hostTourListState);

    switch (hostTourFilter) {
      case "WAITING":
        return hostTourList.filter(
          (listItem) => listItem.houseTourStatus === "WAITING"
        );
        break;
      case "APPROVED":
        return hostTourList.filter(
          (listItem) => listItem.houseTourStatus === "APPROVED"
        );
        break;
      case "REJECTED":
        return hostTourList.filter(
          (listItem) => listItem.houseTourStatus === "REJECTED"
        );
        break;
      case "CANCELED":
        return hostTourList.filter(
          (listItem) => listItem.houseTourStatus === "CANCELED"
        );
        break;
      case "TOUR_COMPLETED":
        return hostTourList.filter(
          (listItem) => listItem.houseTourStatus === "TOUR_COMPLETED"
        );
        break;
      default:
        return hostTourList;
    }
  },
});

export default filteredHostTourListState;
