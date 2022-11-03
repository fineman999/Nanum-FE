import Image from "next/image";
import React from "react";

import HostMoveButton from "./mypage/HostMoveButton";
import styles from "../styles/HostMoveContractListItem.module.css";

// WAITING("대기 중"),
// CONTRACTING("계약 중"),
// REJECTED("거부됨"),
// CANCELED("취소됨"),
// CONTRACT_COMPLETED("계약 완료됨");
const messages = {
  WAITING: "대기중",
  REJECTED: "입주 거부",
  CANCELED: "입주 취소",
  CONTRACTING: "입주 계약 중",
  CONTRACT_COMPLETED: "입주 계약 완료",
};

const HostMoveContractListItem = ({
  listItem,
  handleContract,
  handleComplete,
}) => {
  const { houseName, roomName, inquiry, moveInStatus } = listItem;
  return (
    <li className={styles.move_list_item}>
      <div className={styles.list_item_wrapper}>
        <div className={styles.move_status}>
          <h3>입주 신청: {messages[moveInStatus]}</h3>
          <div className={styles.move_date}>{listItem.moveDate}</div>
          <div className={styles.move_name}>
            <span className={styles.move_house_name}>{houseName}</span>
            <span className="move_room_name">{roomName}</span>
          </div>
          <div className="move_inquiry">{inquiry}</div>
        </div>
        <div className={styles.move_image}>
          <Image
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
            alt="temp"
            layout="fill"
          />
        </div>
      </div>
      <div className={styles.move_btns}>
        <HostMoveButton
          listItem={listItem}
          houseMoveStatus={moveInStatus}
          handleContract={handleContract}
          handleComplete={handleComplete}
        />
      </div>
    </li>
  );
};

export default HostMoveContractListItem;
