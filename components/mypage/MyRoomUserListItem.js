import React from "react";

import styles from "../../styles/MyRoomUserListItem.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar } from "@mui/material";

const MyRoomUserListItem = ({ listItem }) => {
  const { email, nickName: name, phone, profileImgUrl, gender } = listItem;
  return (
    <li className={styles.room_user_list_item}>
      <div className={styles.user_profile}>
        <div className="user_image">
          <Avatar
            alt="Remy Sharp"
            src={profileImgUrl}
            sx={{ marginRight: "10px" }}
          />
        </div>
        <div className="user_info">
          <div className={styles.name}>{name}</div>
          <span className={styles.email}>{email}</span>
        </div>
      </div>
      <div className={styles.user_btns}>
        <div className={styles.mail_btn}>
          <MailIcon />
        </div>
        <div className={styles.chat_btn}>
          <ChatIcon />
        </div>
      </div>
    </li>
  );
};

export default MyRoomUserListItem;
