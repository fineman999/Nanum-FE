import React from "react";

import styles from "../styles/HouseDetailIntro.module.css";

const HouseDetailIntro = ({ data }) => {
  return (
    <div id="house_intro" className={styles.house_intro_wrapper}>
      <div className={styles.house_info_header}>
        <h2>소개</h2>
      </div>
      <div className="house_desc_wrapper">
        <p>{data.explanation}</p>
      </div>
    </div>
  );
};

export default HouseDetailIntro;
