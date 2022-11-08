import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import css from "styled-jsx/css";

const style = css`
  .overlay {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const HouseListItem = ({ item }) => {
  const router = useRouter();
  const {
    id,
    mainHouseImgPath: img,
    houseName: name,
    houseGender: gender,
    streetAddress: address,
  } = item;

  const handleClick = () => {
    router.push(`/house/detail?id=${id}`);
  };

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
        <Image src={img} alt={name} layout="fill" />
      </div>
      <div className="house_info">
        <div className="house_info_header">
          <div className="house_name_wrapper" style={{ width: "90%" }}>
            <div className="house_name">{name}</div>
            <div className="house_address">{address}</div>
          </div>
        </div>
        <div className="house_info_body">
          <div className="house_type_wrapper">
            <div className="gender_type">
              {gender === "COMMON"
                ? "남녀공용"
                : gender === "FEMAIL"
                ? "여성전용"
                : "남성전용"}
            </div>
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
          width: 100%;
          padding: 0 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
