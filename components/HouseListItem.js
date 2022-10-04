import React, { useEffect, useRef, useState } from "react";
import Image from "next/future/image";
import LikeButton from "./common/LikeButton";
import { useRouter } from "next/router";

const HouseListItem = ({ item }) => {
  const router = useRouter();
  const { id, img, name, isLike, gender, type } = item;

  const handleClick = () => {
    router.push(`/house/${id}`);
  };

  const css = { width: "100%", height: "auto" };
  return (
    <div className="house_item_wrapper" onClick={handleClick}>
      <div
        className="house_image"
        style={{
          width: "100%",
          height: "180px",
          position: "relative",
        }}
      >
        <Image src={img} alt={name} fill />
      </div>
      <div className="house_info">
        <div className="house_info_header">
          <div className="house_name_wrapper">
            <div className="house_name">{name}</div>
            <span className="house_address">(해운대구)</span>
          </div>
          {/* 좋아요 버튼 */}
          <LikeButton isLike={isLike} />
        </div>
        <div className="house_info_body">
          <div className="house_type_wrapper">
            <div className="gender_type">{gender}</div>
            <span className="house_type">{type}</span>
          </div>
          <div className="house_state">
            <div className="capacity">신청가능</div>
            <span className="capacity_number">1</span>
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

export default HouseListItem;
