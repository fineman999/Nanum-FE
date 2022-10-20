import { Chip } from "@mui/material";
import Image from "next/image";
import React from "react";

import styles from "../styles/TourContractListItem.module.css";
import { fireAlert } from "./common/Alert";

const messages = {
  WAITING: "대기중",
  APPROVED: "승인됨",
  REJECTED: "거부됨",
  CANCELED: "취소됨",
  TOUR_COMPLETED: "완료됨",
};

const TourButton = ({
  contract,
  houseTourStatus,
  handleCancel,
  handleMove,
}) => {
  switch (houseTourStatus) {
    case "WAITING":
      return (
        <Chip
          label="투어 취소"
          variant="outlined"
          onClick={() => handleCancel(contract.id)}
        />
      );
      break;
    case "APPROVED":
      return <Chip label="투어 승인됨" />;
      break;
    case "REJECTED":
      return <Chip label="투어 거부됨" />;
      break;
    case "CANCELED":
      return <Chip label="투어 취소됨" />;
      break;
    case "TOUR_COMPLETED":
      return (
        <Chip
          label="입주 신청"
          variant="outlined"
          onClick={() => handleMove(contract.houseId, contract.roomId)}
        />
      );
      break;
  }
};

const TourContractListItem = ({ contract, handleCancel, handleMove }) => {
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
          <TourButton
            contract={contract}
            houseTourStatus={houseTourStatus}
            handleCancel={handleCancel}
            handleMove={handleMove}
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

export default TourContractListItem;
