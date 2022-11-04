import React from "react";
import HostTourButton from "./HostTourButton";

import styles from "../styles/HostTourContractListItem.module.css";
import Image from "next/image";

const messages = {
  WAITING: "대기중",
  APPROVED: "승인됨",
  REJECTED: "거부됨",
  CANCELED: "취소됨",
  TOUR_COMPLETED: "완료됨",
};

const HostTourContractListItem = ({
  contract,
  handleApprove,
  handleReject,
  handleComplete,
}) => {
  const { houseTourStatus } = contract;
  return (
    <li className={styles.contract_list_item}>
      <div className={styles.tour_status}>
        <h3>투어 신청 {messages[houseTourStatus]}</h3>
        <div className={styles.tour_date}>{contract.tourDate}</div>
        <div className={styles.tour_name}>
          <span className={styles.tour_house_name}>{contract.houseName}</span>
          <span className="tour_room_name">{contract.roomName}</span>
        </div>
        <div className={styles.tour_btns}>
          <HostTourButton
            contract={contract}
            tourStatus={houseTourStatus}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleComplete={handleComplete}
          />
        </div>
      </div>
      <div className={styles.tour_image}>
        <Image
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
          alt="temp"
          layout="fill"
        />
      </div>
    </li>
  );
};

export default HostTourContractListItem;
