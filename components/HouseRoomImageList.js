import React from "react";

import styles from "../styles/HouseRoomImageList.module.css";

const HouseRoomImageList = ({ data }) => {
  return (
    <div className={styles.room_map}>
      <div className={styles.room_map_preparing}>
        <h1 className="">준비중</h1>
      </div>
      <Image
        src="https://images.unsplash.com/photo-1497217968520-7d8d60b7bc25"
        alt="temp"
        layout="fill"
        priority
      />
    </div>
  );
};

export default HouseRoomImageList;
