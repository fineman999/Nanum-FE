import Image from "next/image";
import React from "react";

import styles from "../../styles/MyHouseInfo.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton } from "@mui/material";
const MyHouseInfo = ({ roomInfo }) => {
  return (
    <div className="house_room_info_wrapper">
      <div className={styles.house_info}>
        <div className={styles.house_img}>
          <Image src={roomInfo.houseImg} alt="temp_img" layout="fill" />
        </div>
        <div className={styles.house_desc}>
          <div className={styles.house_name}>
            {roomInfo.houseName}
            <IconButton>
              <PeopleIcon />
            </IconButton>
          </div>
          <div className={styles.house_zonecode}>
            우편번호: {roomInfo.zipCode}
          </div>
          <div className={styles.house_road}>
            도로명: {roomInfo.streetAddress}
          </div>
          <div className={styles.house_jibun}>지번: {roomInfo.lotAddress}</div>
          <div className={styles.house_detail}>
            상세: {roomInfo.detailAddress}
          </div>
          <div className={styles.detail_btn}>
            <MoreHorizIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHouseInfo;
