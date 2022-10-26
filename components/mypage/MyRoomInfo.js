import { Box, TextField } from "@mui/material";
import React from "react";

import styles from "../../styles/MyRoomInfo.module.css";

const MyRoomInfo = ({ roomInfo }) => {
  return (
    <div className="room_info_wrapper">
      <div className={styles.room_info}>
        <div className={styles.room_body}>
          <div className={styles.roomName}>
            <h4 className={styles.name}>방 이름</h4>
            {roomInfo.roomName}
          </div>
          <div className={styles.moveDate}>
            <h4 className={styles.date}>계약 기간</h4>
            <div className={styles.date_range}>
              <TextField label={roomInfo.moveDate} disabled />
              <Box
                sx={{
                  mx: 2,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                TO
              </Box>
              <TextField label={roomInfo.contractEndDate} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRoomInfo;
