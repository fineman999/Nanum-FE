import React from "react";

import styles from "../../styles/MyRoomInfo.module.css";

const MyRoomInfo = ({ roomInfo }) => {
  return (
    <div className="room_info_wrapper">
      <div className={styles.room_info}>
        <div className={styles.room_body}>
          <div className={styles.roomName}>이름: {roomInfo.roomName}</div>
          <div className={styles.moveDate}>
            계약 시작 날짜: {roomInfo.moveDate}
          </div>
          <div className={styles.endDate}>
            계약 만료 날짜 : {roomInfo.contractEndDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRoomInfo;
