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
  CONTRACTING: "입주 중",
  CONTRACT_COMPLETED: "계약 완료",
};

const HostMoveContractListItem = ({
  listItem,
  handleContract,
  handleComplete,
}) => {
  const { moveInStatus } = listItem;
  return (
    <li className={styles.move_list_item}>
      <div className={styles.move_status}>
        <h3>입주 신청: {messages[moveInStatus]}</h3>
        <div className={styles.move_date}>{listItem.moveDate}</div>
        <div className={styles.move_name}>
          <span className={styles.move_house_name}>하우스 이름</span>
          <span className="tour_room_name">방 이름</span>
        </div>
        <div className={styles.move_btns}>
          <HostMoveButton
            listItem={listItem}
            houseMoveStatus={moveInStatus}
            handleContract={handleContract}
            handleComplete={handleComplete}
          />
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

export default HostMoveContractListItem;
