import { Divider } from "@mui/material";
import React, { Fragment, useState } from "react";
import HouseNearPlaceListItem from "./HouseNearPlaceListItem";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import styles from "../styles/HouseNearPlaceList.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const HouseNearPlaceList = ({ places }) => {
  const [fold, setFold] = useState(true);
  const onFold = () => setFold(true); //접는 경우
  const offFold = () => setFold(false); //접지 않는 경우
  return (
    <div className={cx("house_near_places_wrapper", `${fold ? "fold" : ""}`)}>
      <ul className={styles.place_list}>
        {places &&
          places.map((place, index) => (
            <Fragment key={index}>
              <HouseNearPlaceListItem place={place} />
              {index <= places.length - 1 ? <Divider /> : ""}
            </Fragment>
          ))}
      </ul>
      <div className={cx("fold_bar", "fold")}>
        {fold ? (
          <ArrowDropDownIcon fontSize="large" onClick={offFold} />
        ) : (
          <ArrowDropUpIcon fontSize="large" onClick={onFold} />
        )}
      </div>
    </div>
  );
};

export default HouseNearPlaceList;
