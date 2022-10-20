import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import styles from "../styles/TourContractFilter.module.css";
import tourFilterState from "../state/atom/tourFilterState";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const TourContractFilter = () => {
  const [filterStateList, setFilterStateList] = useState([
    {
      id: 1,
      name: "전체",
      active: true,
    },
    {
      id: 2,
      name: "대기",
      active: false,
    },
    {
      id: 3,
      name: "승인",
      active: false,
    },
    {
      id: 4,
      name: "거부",
      active: false,
    },
    {
      id: 5,
      name: "취소",
      active: false,
    },
    {
      id: 6,
      name: "완료",
      active: false,
    },
  ]);
  const setTourFilterState = useSetRecoilState(tourFilterState);

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
        setTourFilterState("WAITING");
        break;
      case "승인":
        setTourFilterState("APPROVED");
        break;
      case "거부":
        setTourFilterState("REJECTED");
        break;
      case "취소":
        setTourFilterState("CANCELED");
        break;
      case "완료":
        setTourFilterState("TOUR_COMPLETED");
        break;
      default:
        setTourFilterState("ALL");
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

export default TourContractFilter;
