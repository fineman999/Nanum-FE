import React, { useState } from "react";
import SwipeableEdgeDrawer from "../components/SwipeableEdgeDrawer";
import ChatIcon from "@mui/icons-material/Chat";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { IconButton } from "@mui/material";

import styles from "../styles/HouseToolbar.module.css";
import LikeButton from "./common/LikeButton";
import { getChat, postChat } from "../lib/apis/chat";
import { useRecoilState } from "recoil";
import { userState } from "../state/atom/authState";
import { useRouter } from "next/router";

const HouseToolbar = ({
  roomData,
  tourForm,
  setTourForm,
  like,
  open,
  toggleDrawer,
  hostId,
  houseId,
}) => {
  const [userData, setUserData] = useRecoilState(userState);
  const router = useRouter();

  const handleChatConnected = async () => {
    const users = [hostId, userData.id];
    try {
      const response = await getChat({ houseId: 0, users });
      if (!response.data.id) {
        console.log("true");
        let obj = {
          userIds: [hostId, userData.id],
          houseId: 0,
          roomName: "",
          houseImg: "/images/default.png",
        };
        const createChat = await postChat(obj);

        router.push(`/chat/${createChat.data.id}`);
        return;
      } else {
        router.push(`/chat/${response.data.id}`);
        return;
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div className={styles.house_toolbar_container}>
      <SwipeableEdgeDrawer
        roomData={roomData}
        tourForm={tourForm}
        setTourForm={setTourForm}
        open={open}
        toggleDrawer={toggleDrawer}
      />
      <div className={styles.toolbar_wrapper}>
        <div className={styles.toolbar_ico_like_wrapper}>
          <LikeButton isLike={like} />
        </div>
        <div className={styles.toolbar_info_wrapper}>
          <h2 className={styles.house_name}>나눔101</h2>
          <span className="house_address">부산시 해운대구 우동</span>
        </div>
        <div className={styles.house_toolbar_btns}>
          <div className="btn_call">
            <IconButton onClick={handleChatConnected}>
              <ChatIcon />
              <span className={styles.btn_text}>채팅문의</span>
            </IconButton>
          </div>
          <div className="btn_reg">
            <IconButton onClick={toggleDrawer(true)}>
              <HowToRegIcon />
              <span className={styles.btn_text}>투어신청</span>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseToolbar;
