import React from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";

import { Skeleton } from "@mui/material";

import styles from "../../styles/LikeListItem.module.css";
import LikeButton from "../common/LikeButton";

const genderType = {
  COMMON: "남녀공용",
  MALE: "남성전용",
  FEMALE: "여성전용",
};

const HOUSE_NAME_LENGTH_SIZE = 8;
const HOUSE_ADDRESS_LENGTH_SIZE = 10;

const HouseInfo = ({ listItem, loading = false }) => {
  const {
    userId,
    houseId,
    wishId,
    houseName,
    lotAddress: jibunAddress,
    mainHouseImgPath: mainImage,
  } = listItem;
  return (
    <>
      <div
        className="house_image"
        style={{
          width: "100%",
          height: "180px",
          position: "relative",
        }}
      >
        {!loading ? (
          <Image src={mainImage} alt={houseName} layout="fill" />
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      {!loading ? (
        <div className="house_info">
          <div className="house_info_header">
            <div className="house_name_wrapper">
              <div className="house_name">
                {houseName.length > HOUSE_NAME_LENGTH_SIZE
                  ? `${name.slice(0, HOUSE_NAME_LENGTH_SIZE)}...`
                  : houseName}
              </div>

              <span className="house_address">
                {jibunAddress.length > HOUSE_ADDRESS_LENGTH_SIZE
                  ? `${jibunAddress.slice(0, HOUSE_ADDRESS_LENGTH_SIZE)}...`
                  : jibunAddress}
              </span>
            </div>
            {/* 좋아요 버튼 */}
            <LikeButton
              isLike={wishId ? true : false}
              listItem={listItem}
              wishId={wishId}
            />
          </div>
          <div className="house_info_body">
            <div className="house_type_wrapper">
              <div className="gender_type">성별타입</div>
              <span className="house_type">주거타입</span>
            </div>
            <div className="house_state">
              <div className="capacity">신청가능</div>
              <span className="capacity_number">1</span>
            </div>
          </div>
          <div className="house_info_bottom">
            <div className="house_price">최대값: 0원</div>
            <div className="house_price">최저값: 0원</div>
            <div className={styles.house_review}>
              <StarIcon fontSize="16" /> 0.0 0개
            </div>
          </div>
        </div>
      ) : (
        <div className="house_info">
          <div className={styles.skeleton_house_info_header}>
            <div className="house_name_wrapper">
              <div className={styles.skeleton_house_name}>
                <Skeleton sx={{ width: "100%" }} />
              </div>
              <span className="house_address">
                <Skeleton sx={{ width: "50%" }} />
              </span>
            </div>
          </div>
          <div className="house_info_body">
            <Skeleton sx={{ width: "100%" }} />
          </div>
          <div className="house_info_bottom">
            <Skeleton sx={{ width: "100%" }} />
            <Skeleton sx={{ width: "100%" }} />
            <Skeleton sx={{ width: "100%" }} />
          </div>
        </div>
      )}

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
    </>
  );
};

const LikeListItem = ({ listItem, loading }) => {
  return (
    <li className={styles.house_list_item}>
      <div className={styles.house_item_wrapper}>
        <HouseInfo listItem={listItem} loading={loading} />
      </div>
    </li>
  );
};

export default LikeListItem;
