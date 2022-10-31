import Image from "next/image";
import React from "react";

import styles from "../../styles/MyMoveListItem.module.css";
import MoveButton from "./MoveButton";

const messages = {
  WAITING: "대기중",
  REJECTED: "거부",
  CANCELED: "취소",
  CONTRACTING: "계약 중",
  CONTRACT_COMPLETED: "계약 완료",
};

const MyMoveListItem = ({ listItem }) => {
  const { houseName, roomName, moveInStatus } = listItem;
  return (
    <li className={styles.move_list_item}>
      <div className={styles.move_status}>
        <h3>입주 신청 {messages[moveInStatus]}</h3>
        <div className={styles.move_date}>{listItem.moveDate}</div>
        <div className={styles.move_name}>
          <span className={styles.move_house_name}>{houseName}</span>
          <span className="tour_room_name">{roomName}</span>
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
