import { Button } from "@mui/material";
import React, { useState } from "react";

import styles from "../styles/HouseDetailIntro.module.css";

const HouseDetailIntro = ({ data }) => {
  const [descMore, setDescMore] = useState(false);

  return (
    <div id="house_intro" className={styles.house_intro_wrapper}>
      <div className={styles.house_info_header}>
        <h2>소개</h2>
      </div>
      <div className="house_desc_wrapper">
        <p>{data.explanation}</p>
      </div>
      <div className="more_btn_wrapper">
        <Button onClick={() => setDescMore(!descMore)}>
          {descMore ? "접기" : "더보기"}
        </Button>
      </div>
    </div>
  );
};

export default HouseDetailIntro;
