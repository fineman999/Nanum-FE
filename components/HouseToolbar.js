import React from "react";
import SwipeableEdgeDrawer from "../components/SwipeableEdgeDrawer";

import CallIcon from "@mui/icons-material/Call";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { IconButton } from "@mui/material";

import styles from "../styles/HouseToolbar.module.css";
import LikeButton from "./common/LikeButton";

const HouseToolbar = ({ like, open, toggleDrawer }) => {
  return (
    <div className={styles.house_toolbar_container}>
      <SwipeableEdgeDrawer open={open} toggleDrawer={toggleDrawer} />
      <div className={styles.toolbar_wrapper}>
        <div className={styles.toolbar_ico_like_wrapper}>
          <LikeButton isLike={like} />
        </div>
        <div className={styles.toolbar_info_wrapper}>
          <h2 className={styles.house_name}>나눔101</h2>
          <span className="house_address">부산시 해운대구 우동</span>
        </div>
        <div className={styles.house_toolbar_btns}>
          <div className="btn_call">
            <IconButton>
              <CallIcon />
              <span className={styles.btn_text}>전화문의</span>
            </IconButton>
          </div>
          <div className="btn_reg">
            <IconButton onClick={toggleDrawer(true)}>
              <HowToRegIcon />
              <span className={styles.btn_text}>투어신청</span>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseToolbar;
