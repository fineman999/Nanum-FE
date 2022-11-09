import Image from "next/image";
import React from "react";

import styles from "../../styles/MyHouseInfo.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton } from "@mui/material";
import { getHouseChat, putChat } from "../../lib/apis/chat";
import { fireAlert } from "../common/Alert";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atom/authState";
import { useRouter } from "next/router";
import { initChat } from "../../lib/utils/useful-functions";
const MyHouseInfo = ({ roomInfo }) => {
  const userData = useRecoilValue(userState);
  const router = useRouter();
  const handleChat = async () => {
    const houseId = roomInfo.houseId;
    try {
      const getChat = await getHouseChat({ houseId });
      if (!getChat.data) {
        fireAlert({ icon: "error", title: "채팅방이 존재하지 않습니다." });
        return;
      }
      // 기존에 채팅방에 없는 경우
      let { id } = getChat.data;
      const result = await findUserInChat(getChat.data);
      if (!result) {
        const userId = userData.id;
        const getResult = await putChat({ id, userId });
        if (getResult.status === 200) {
          await initChat({
            userId: userData.id,
            chatRoomId: getResult.data.id,
            userName: userData.nickName,
            type: "CHATIN",
            msg: `${userData.nickName}님이 들어왔습니다.`,
            img: userData.profileImgUrl,
          });
        }
        id = getResult.data.id;
      }
      await goChat(id);
    } catch (e) {
      console.log("Errror", e);
    }
  };
  const findUserInChat = async (data) => {
    let value = false;
    data.roomInfo.users.filter((user) => {
      if (user.userId + "" === userData.id + "") {
        value = true;
      }
    });
    return value;
  };

  const goChat = async (room) => {
    router.push(`/chat/${room}`);
  };

  return (
    <div className="house_room_info_wrapper">
      <div className={styles.house_info}>
        <div className={styles.house_img}>
          <Image src={roomInfo.houseImg} alt="temp_img" layout="fill" />
        </div>
        <div className={styles.house_desc}>
          <div className={styles.house_name}>
            {roomInfo.houseName}
            <IconButton onClick={handleChat}>
              <PeopleIcon />
            </IconButton>
          </div>
          <div className={styles.house_zonecode}>
            우편번호: {roomInfo.zipCode}
          </div>
          <div className={styles.house_road}>
            도로명: {roomInfo.streetAddress}
          </div>
          <div className={styles.house_jibun}>지번: {roomInfo.lotAddress}</div>
          <div className={styles.house_detail}>
            상세: {roomInfo.detailAddress}
          </div>
          <div className={styles.detail_btn}>
            <MoreHorizIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHouseInfo;
