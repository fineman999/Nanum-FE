import React from "react";
import HouseNearInfo from "./HouseNearInfo";

import styles from "../styles/HouseNearDetail.module.css";

const HouseNearDetail = () => {
  return (
    <div id="house_detail" className={styles.house_detail_info_wrapper}>
      <div className={styles.house_info_header}>
        <h2>주변 정보</h2>
      </div>
      <HouseNearInfo />
    </div>
  );
};

export default HouseNearDetail;
