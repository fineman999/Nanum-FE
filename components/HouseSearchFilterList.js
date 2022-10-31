import { Chip } from "@mui/material";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import houseSearchFilterState from "../state/atom/houseSearchFilterState";
import houseSearchListFilterState from "../state/atom/houseSearchListFilterState";

import styles from "../styles/HouseSearchFilterList.module.css";

const HouseSearchFilterList = () => {
  const [filterList, setFilterList] = useRecoilState(
    houseSearchListFilterState
  );
  const setHouseSearchFilter = useSetRecoilState(houseSearchFilterState);
  const handleClick = (listItem, filterName) => {
    const nextFilterList = filterList.map((item) => {
      if (item.id === listItem.id) {
        return {
          ...item,
          active: true,
        };
      } else if (item.active) {
        return {
          ...item,
          active: false,
        };
      } else {
        return item;
      }
    });

    switch (filterName) {
      case "남녀공용":
        setHouseSearchFilter("COMMON");
        break;
      case "남성전용":
        setHouseSearchFilter("MALE");
        break;
      case "여성전용":
        setHouseSearchFilter("FEMALE");
        break;
      case "리뷰순":
        setHouseSearchFilter("REVIEW");
        break;
      case "최저순":
        setHouseSearchFilter("MINIMUM");
        break;
      case "최고순":
        setHouseSearchFilter("MAXIMUM");
        break;
      case "좋아요":
        setHouseSearchFilter("LIKE");
        break;
      default:
        setHouseSearchFilter("ALL");
    }
    setFilterList(nextFilterList);
  };

  return (
    <div className="filter_list_wrapper">
      <ul className={styles.filter_list}>
        {filterList &&
          filterList.map((listItem) => (
            <li key={listItem.id} className={styles.list_item}>
              <Chip
                color={`${listItem.active ? "primary" : "default"}`}
                label={listItem.name}
                onClick={() => handleClick(listItem, listItem.name)}
                sx={{ p: 1, background: listItem.active ? "" : "white" }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HouseSearchFilterList;
