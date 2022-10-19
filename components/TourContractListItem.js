import { Chip } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

import styles from "../styles/TourContractListItem.module.css";

const messages = {
  WAITING: "대기중",
  APPROVED: "승인됨",
  REJECTED: "거부됨",
  CANCELED: "취소됨",
  TOUR_COMPLETED: "완료됨",
};

const TourButton = (contract, tourStatus, handleCancel) => {
  switch (tourStatus) {
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
      return (
        <Chip
          label="입주 신청"
          variant="outlined"
          onClick={() => console.log("입주 신청!")}
        />
      );
      break;
    case "REJECTED":
      return <Chip label="투어 거부됨" />;
      break;
    case "CANCELED":
      return <Chip label="투어 취소됨" />;
      break;
    case "TOUR_COMPLETED":
      return <Chip label="투어 완료됨" />;
      break;
  }
};

const TourContractListItem = ({ contract, handleCancel }) => {
  const { houseTourStatus } = contract;

  useEffect(() => {
    console.log("TourContractListItem ", contract);
  }, []);

  return (
    <li className={styles.contract_list_item}>
      <div className={styles.tour_status}>
        <h3>투어 신청 {messages[houseTourStatus]}</h3>
        <div className={styles.tour_date}>{contract.tourDate}</div>{" "}
        <div className="tour_btns">
          {TourButton(contract, houseTourStatus, handleCancel)}
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
