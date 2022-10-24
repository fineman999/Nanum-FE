import React from "react";

import styles from "../../styles/MyRoomUserListItem.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import MailIcon from "@mui/icons-material/Mail";
const MyRoomUserListItem = ({ listItem }) => {
  return (
    <li className={styles.room_user_list_item}>
      <div className={styles.user_name}>{listItem.name}</div>
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
