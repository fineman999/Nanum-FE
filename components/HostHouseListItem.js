import Chip from "@mui/material/Chip";
import Image from "next/image";
import React from "react";

import styles from "../styles/HostHouseListItem.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HostHouseListItem = ({ item }) => {
  return (
    <li className={styles.host_houst_list_item}>
      <div className={styles.house_info}>
        <div className="house_name">{item.houseName}</div>
        <div className="house_address">{item.lotAddress}</div>
        <div className={styles.house_status}>
          <div className="like_status">
            <FavoriteIcon />
          </div>
          <div className="aprv_status">
            {item.status === "BEFORE_APPROVAL" ? (
              <Chip label="승인대기중" variant="outlined" />
            ) : (
              <Chip label="승인완료" />
            )}
          </div>
        </div>
      </div>
      <div className={styles.house_thumnail}>
        <Image
          src={item.mainHouseImgPath}
          alt="main_thumnail"
          layout="fill"
          priority
        />
      </div>
    </li>
  );
};

export default HostHouseListItem;
