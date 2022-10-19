import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { get } from "../lib/apis/apiClient";

import styles from "../styles/HouseRoomDetail.module.css";
import HouseRoomItem from "./HouseRoomItem";

const HouseRoomDetail = ({
  data,
  roomData,
  setRoomData,
  tourForm,
  setTourForm,
  toggleDrawer,
}) => {
  useEffect(() => {
    const { id } = data;
    const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;
    const API_URI = `/houses/${id}/rooms`;

    if (id) {
      get(BASE_URL, API_URI)
        .then((res) => res.data)
        .then((data) => {
          console.log("하우스 방 목록: ", data);
          setRoomData([...data.result.content]);
        })
        .catch((err) => console.log("하우스 방 목록 조회: ", err));
    }
  }, [data]);

  return (
    <div id="house_room" className={styles.house_room_info_wrapper}>
      <div className={styles.house_info_header}>
        <h2>방 정보</h2>
      </div>
      <div className={styles.room_map}>
        <div className={styles.room_map_preparing}>
          <h1 className="">준비중</h1>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1497217968520-7d8d60b7bc25"
          alt="temp"
          layout="fill"
          priority
        />
      </div>

      <div className={styles.room_list}>
        {roomData &&
          roomData.map((room) => (
            <HouseRoomItem
              key={room.id}
              data={room}
              tourForm={tourForm}
              setTourForm={setTourForm}
              toggleDrawer={toggleDrawer}
            />
          ))}
      </div>

      <div className={styles.room_notice}>
        - 미성년자 또는 41세 이상, 회원 가입시 개인정보가 계약자와 다를 경우
        입주 불가능
        <br /> - 운영관리비와 선불공과금은 매월 별도 납부 함 [자세히 알아보기]
        <br /> - 입주신은 두 지점까지 가능 - 입주신청은 입주가능일 45일 전부터
        가능
        <br /> - 입주가능알림 신청 후 입주가 가능해질 때 입주신청가능으로 SMS
        자동문자 발송
        <br /> - 나눔의 하우스는 반전세 적용이 가능합니다. (보증금 1,000만원
        상향 시 월세 5만원 할인)
        <br /> - 경우에 따라 반전세 적용이 불가한 하우스도 있으니 반드시 확인
        부탁드립니다. [자세히 알아보기]
      </div>
    </div>
  );
};

export default HouseRoomDetail;
