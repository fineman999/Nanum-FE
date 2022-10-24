import Image from "next/image";
import React from "react";

import styles from "../../styles/MyMoveListItem.module.css";
import MoveButton from "./MoveButton";

const messages = {
  WAITING: "대기중",
  APPROVED: "승인됨",
  REJECTED: "거부됨",
  CANCELED: "취소됨",
  TOUR_COMPLETED: "완료됨",
};

const MyMoveListItem = ({ listItem }) => {
  const { moveInStatus } = listItem;
  return (
    <li className={styles.move_list_item}>
      <div className={styles.move_status}>
        <h3>입주 신청 {messages[moveInStatus]}</h3>
        <div className={styles.move_date}>{listItem.moveDate}</div>
        <div className={styles.move_name}>
          <span className={styles.move_house_name}>하우스_이름</span>
          <span className="tour_room_name">방_이름</span>
        </div>
        <div className={styles.move_btns}>
          <MoveButton houseMoveStatus={moveInStatus} />
        </div>
      </div>
      <div className={styles.move_image}>
        <Image
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
          alt="temp"
          layout="fill"
        />
      </div>
    </li>
  );
};

export default MyMoveListItem;
