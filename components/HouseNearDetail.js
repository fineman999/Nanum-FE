import React, { useEffect, useState } from "react";
import HouseNearInfo from "./HouseNearInfo";

import styles from "../styles/HouseNearDetail.module.css";
import HouseNearPlaceList from "./HouseNearPlaceList";

const HouseNearDetail = ({ data }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    console.log("검색 키워드 데이터: ", places);
  }, [places]);

  const addPlace = (place) => {
    setPlaces((prev) => {
      return [...prev, place];
    });
  };
  return (
    <div id="house_detail" className={styles.house_detail_info_wrapper}>
      <div className={styles.house_info_header}>
        <h2>주변 정보</h2>
      </div>
      <HouseNearInfo data={data} addPlace={addPlace} />
      <HouseNearPlaceList places={places} />
    </div>
  );
};

export default HouseNearDetail;
