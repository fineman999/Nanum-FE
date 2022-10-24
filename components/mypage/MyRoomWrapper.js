import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { get } from "../../lib/apis/apiClient";
import { userState } from "../../state/atom/authState";
import MyHouseInfo from "./MyHouseInfo";
import MyRoomInfo from "./MyRoomInfo";
import MyRoomUserList from "./MyRoomUserList";

import styles from "../../styles/MyRoomWrapper.module.css";
import { Divider } from "@mui/material";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const MyRoomWrapper = () => {
  const userValue = useRecoilValue(userState);
  const [roomInfo, setRoomInfo] = useState({});
  useEffect(() => {
    const API_URI = `/move-in/users/in/${userValue.id}`;

    get(BASE_URL, API_URI)
      .then((res) => {
        console.log(res);
        setRoomInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.my_room_wrapper}>
      <div className="house_info_section">
        <div className={styles.section_header}>
          <h3>하우스 정보</h3>
        </div>
        <Divider />
        <div className="section_body">
          <MyHouseInfo roomInfo={roomInfo} />
        </div>
      </div>
      <Divider />
      <div className="room_info_section">
        <div className={styles.section_header}>
          <h3>계약 정보</h3>
        </div>
        <Divider />
        <div className="section_body">
          <MyRoomInfo roomInfo={roomInfo} />
        </div>
      </div>
      <Divider />
      <div className="user_list_section">
        <div className={styles.section_header}>
          <h3>이웃</h3>
        </div>
        <Divider />
        <div className="section_body">
          <MyRoomUserList roomInfo={roomInfo} />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default MyRoomWrapper;
