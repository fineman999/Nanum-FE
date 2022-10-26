import { Chip } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import houseSearchListFilterState from "../state/atom/houseSearchListFilterState";

import styles from "../styles/HouseSearchFilterList.module.css";

const HouseSearchFilterList = () => {
  const [filterList, setFilterList] = useRecoilState(
    houseSearchListFilterState
  );

  const handleClick = (listItem) => {
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
                onClick={() => handleClick(listItem)}
                sx={{ p: 1, background: listItem.active ? "" : "white" }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HouseSearchFilterList;
