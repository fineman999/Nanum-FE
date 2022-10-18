import React from "react";
import HouseReviewList from "./HouseReviewList";

import styles from "../styles/HouseReviewDetail.module.css";

const HouseReviewDetail = () => {
  return (
    <div id="house_review" className={styles.house_review_wrapper}>
      <div className={styles.house_info_header}>
        <h2>리뷰</h2>
      </div>
      <HouseReviewList />
    </div>
  );
};

export default HouseReviewDetail;
