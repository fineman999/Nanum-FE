import { Button } from "@mui/material";
import React, { useState } from "react";

const HouseRoomItem = ({ toggleDrawer }) => {
  const [toured, setToured] = useState(false);

  return (
    <div className="room_item_wrapper">
      <div className="room_info_wrapper">
        <div className="room_name">
          <strong>나눔 103동 111호</strong>
        </div>
        <div className="room_type">
          <div className="gender_type">
            <strong>성별: </strong>여성전용
          </div>
          <div className="capacity_type">
            <strong>인원: </strong>2인실
          </div>
        </div>
        <div className="room_price">
          <div className="monthly">
            <strong>월세: </strong>500,000원
          </div>
          <div className="deposit">
            <strong>보증금: </strong>500,000원
          </div>
        </div>
      </div>
      {/* 투어 신청 시 입주 신청으로 변경 */}
      <div className="room_btn_wrapper">
        {toured ? (
          <button className="move_btn">입주 신청</button>
        ) : (
          <button className="tour_btn" onClick={toggleDrawer(true)}>
            투어 신청
          </button>
        )}
      </div>
      <style jsx>{`
        .room_item_wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;

          box-sizing: border-box;
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .room_info_wrapper {
          box-sizing: border-box;
          width: 65%;
        }

        .room_name {
          margin-bottom: 5px;
        }

        .room_type {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .room_price {
          display: flex;
          justify-content: space-between;
          font-size: 0.7em;
        }

        .room_btn_wrapper {
          width: 30%;
        }

        .room_btn_wrapper {
          display: flex;
          justify-content: center;
        }

        .tour_btn {
          box-sizing: border-box;
          padding: 15px;
          border-radius: 15px;
          font-size: 0.8em;

          border: none;
          background: #76c1b2;
          color: white;
          cursor: pointer;
        }

        .tour_btn:hover {
          background: #555555;
        }

        // 미디어 쿼리
        @media all (min-width: 1024px) {
        }
      `}</style>
    </div>
  );
};

export default HouseRoomItem;
