import React, { useState } from "react";

import styles from "../../styles/MyRoomUserListItem.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar } from "@mui/material";
import { getChat, postChat } from "../../lib/apis/chat";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atom/authState";
import { useRouter } from "next/router";

const MyRoomUserListItem = ({ listItem }) => {
  const { email, nickName: name, phone, profileImgUrl, gender, id } = listItem;
  const [roomNum, setRoomNum] = useState(undefined);
  const userData = useRecoilValue(userState);
  const router = useRouter();
  const makeChat = async (roomNum) => {
    let obj = {
      userIds: [id, userData.id],
      houseId: 0,
      roomName: "",
      houseImg: "/images/default.png",
    };
    try {
      const chat = await postChat(obj);
      await goChat(chat.data.id);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSend = async () => {
    router.push(
      {
        pathname: "/mail/send",
        query: {
          name: name,
          receiverId: id,
          senderId: userData.id,
        },
      },
      "/mail/send"
    );
  };
  const handleChat = async () => {
    const houseId = 0;
    const users = [id, userData.id];
    try {
      const chat = await getChat({ houseId, users });
      if (chat.data.id === undefined) {
        await makeChat(chat.data.id);
      } else {
        await goChat(chat.data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goChat = async (room) => {
    router.push(`/chat/${room}`);
  };
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
        <div className={styles.mail_btn} onClick={handleSend}>
          <MailIcon />
        </div>
        <div className={styles.chat_btn} onClick={handleChat}>
          <ChatIcon />
        </div>
      </div>
    </li>
  );
};

export default MyRoomUserListItem;
