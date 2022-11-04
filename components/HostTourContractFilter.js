import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import hostFilterStateListState from "../state/atom/hostFilterStateListState";
import hostTourFilterState from "../state/atom/hostTourFilterState";
import styles from "../styles/HostTourContractFilter.module.css";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const HostTourContractFilter = () => {
  const [filterStateList, setFilterStateList] = useRecoilState(
    hostFilterStateListState
  );
  const setHostTourFilterState = useSetRecoilState(hostTourFilterState);
  const handleClick = (e, id) => {
    const nextFilterStateList = filterStateList.map((listItem) => {
      if (listItem.id === id) {
        return { ...listItem, active: true };
      } else if (listItem.active) {
        return { ...listItem, active: false };
      } else {
        return listItem;
      }
    });

    const filterState = e.target.childNodes[0].nodeValue;

    switch (filterState) {
      case "대기":
        setHostTourFilterState("WAITING");
        break;
      case "승인":
        setHostTourFilterState("APPROVED");
        break;
      case "거부":
        setHostTourFilterState("REJECTED");
        break;
      case "취소":
        setHostTourFilterState("CANCELED");
        break;
      case "완료":
        setHostTourFilterState("TOUR_COMPLETED");
        break;
      default:
        setHostTourFilterState("ALL");
    }
    setFilterStateList(nextFilterStateList);
  };

  return (
    <ul className={styles.filter_list}>
      {filterStateList &&
        filterStateList.map((listItem) => (
          <li
            key={listItem.id}
            className={cx("filter_list_item", `${listItem.active && "active"}`)}
            onClick={(event) => handleClick(event, listItem.id)}
          >
            {listItem.name}
          </li>
        ))}
    </ul>
  );
};

export default HostTourContractFilter;
