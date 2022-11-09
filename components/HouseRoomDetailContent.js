import React, { useEffect } from "react";
import HouseRoomDetailList from "./HouseRoomDetailList";
import HouseRoomImageList from "./HouseRoomImageList";
import HouseRoomItem from "./HouseRoomItem";

const HouseRoomDetailContent = ({ data }) => {
  // useEffect(() => {
  //   console.log("방 목록 API 호출!!");
  // }, []);
  return (
    <div id="house_room" className="house_room_info_wrapper">
      <div className="house_info_header">
        <h2>방 정보</h2>
      </div>
      <HouseRoomImageList data={data} />
      <HouseRoomDetailList />
      <div className="room_list">
        <HouseRoomItem toggleDrawer={toggleDrawer} />
        <HouseRoomItem toggleDrawer={toggleDrawer} />
        <HouseRoomItem toggleDrawer={toggleDrawer} />
        <HouseRoomItem toggleDrawer={toggleDrawer} />
      </div>
      <div className="room_notice">
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

export default HouseRoomDetailContent;
