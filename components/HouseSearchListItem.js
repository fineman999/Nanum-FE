import React, { useEffect } from "react";
import Image from "next/image";
import LikeButton from "./common/LikeButton";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";

import styles from "../styles/HouseListItem.module.css";

const genderType = {
  COMMON: "남녀공용",
  MALE: "남성전용",
  FEMALE: "여성전용",
};

const HOUSE_NAME_LENGTH_SIZE = 8;
const HOUSE_ADDRESS_LENGTH_SIZE = 10;

const HouseSearchListItem = ({ listItem }) => {
  const router = useRouter();
  const {
    id,
    houseName: name,
    houseGender: gender,
    houseType: type = "쉐어",
    mainHouseImgPath: img,
    maxMonthlyRent,
    minMonthlyRent,
    reviewAvg,
    reviewCount,
    streetAddress,
    wishCount,
    wishId,
  } = listItem;

  const handleClick = () => {
    router.push(`/house/${id}`);
  };

  return (
    <div className={styles.house_item_wrapper} onClick={handleClick}>
      <div
        className="house_image"
        style={{
          width: "100%",
          height: "180px",
          position: "relative",
        }}
      >
        <Image src={img} alt={name} layout="fill" />
      </div>
      <div className="house_info">
        <div className="house_info_header">
          <div className="house_name_wrapper">
            <div className="house_name">
              {name.length > HOUSE_NAME_LENGTH_SIZE
                ? `${name.slice(0, HOUSE_NAME_LENGTH_SIZE)}...`
                : name}
            </div>
            <span className="house_address">
              (
              {streetAddress.length > HOUSE_ADDRESS_LENGTH_SIZE
                ? `${streetAddress.slice(0, HOUSE_ADDRESS_LENGTH_SIZE)}...`
                : streetAddress}
              )
            </span>
          </div>
          {/* 좋아요 버튼 */}
          <LikeButton isLike={wishId ? true : false} listItem={listItem} />
        </div>
        <div className="house_info_body">
          <div className="house_type_wrapper">
            <div className="gender_type">{genderType[gender]}</div>
            <span className="house_type">{type}</span>
          </div>
          <div className="house_state">
            <div className="capacity">신청가능</div>
            <span className="capacity_number">1</span>
          </div>
        </div>
        <div className="house_info_bottom">
          <div className="house_price">최대값: {maxMonthlyRent}</div>
          <div className="house_price">최저값: {minMonthlyRent}</div>
          <div className={styles.house_review}>
            <StarIcon fontSize="16" /> {reviewAvg} {reviewCount}개
          </div>
        </div>
      </div>
      <style jsx>{`
        .house_item_wrapper {
          position: relative;
        }

        .house_info {
          position: relative;
          padding: 15px;
          background: white;
        }

        .house_info_header {
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          color: #76c1b2;
          margin-bottom: 15px;
        }

        .house_name {
          font-size: 1.4em;
          font-weight: bold;
        }

        .house_address {
          font-size: 1em;
          font-weight: normal;
        }

        .house_info_body {
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .house_type_wrapper {
          display: flex;
          align-items: center;
        }

        .gender_type {
          font-size: 1.2em;
          font-weight: bold;
        }

        .house_type {
          font-size: 0.9em;
        }

        .house_state {
          display: flex;
          align-items: center;
        }
        .capacity {
          font-size: 1.2em;
          margin-right: 0.5em;
          font-weight: bold;
        }

        .capacity_number {
          color: red;
          margin-right: 0.5em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default HouseSearchListItem;
