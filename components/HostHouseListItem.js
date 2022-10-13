import Chip from "@mui/material/Chip";
import Image from "next/image";
import React from "react";

import styles from "../styles/HostHouseListItem.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";

const HostHouseListItem = ({ item }) => {
  return (
    <li className={styles.host_houst_list_item}>
      <div className={styles.house_info}>
        <div className={styles.house_name}>
          <h3>{item.houseName}</h3>
        </div>
        <div className={styles.house_address}>주소: {item.lotAddress}</div>
        <div className={styles.house_status}>
          <div className={styles.like_status}>
            <FavoriteIcon sx={{ marginRight: "4px" }} fontSize="small" />
            <span className={styles.like_num}>100</span>
          </div>
          <div className="aprv_status">
            {item.status === "BEFORE_APPROVAL" ? (
              <div className="">
                <Chip label="승인대기중" sx={{ mr: 1, fontWeight: "bold" }} />
                <Link href={`/host/house/edit/${item.id}`}>
                  <Chip
                    label="수정"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </Link>
              </div>
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
