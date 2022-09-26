import React, { useState } from "react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";
import { Favorite } from "@mui/icons-material";

const HouseListItem = ({ item }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div className="house_item_wrapper">
      <div
        className="house_image"
        style={{
          width: "100%",
          height: "180px",
          position: "relative",
        }}
      >
        <Image src={item.img} alt={item.title} layout="fill" />
      </div>
      <div className="house_info">
        <div className="house_info_header">
          <div className="house_name_wrapper">
            <div className="house_name">나눔 101호</div>
            <span className="house_address">(해운대구)</span>
          </div>
          <div className="favorite_icon" onClick={handleLike}>
            {like ? (
              <Favorite sx={{ color: pink[500] }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: pink[500] }} />
            )}
          </div>
        </div>
        <div className="house_info_body">
          <div className="house_type_wrapper">
            <div className="gender_type">남성전용</div>
            <span className="house_type">빌라</span>
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
