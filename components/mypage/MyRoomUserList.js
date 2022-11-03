import { Divider } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { get } from "../../lib/apis/apiClient";
import { userState } from "../../state/atom/authState";
import styles from "../../styles/MyRoomUserList.module.css";
import MyRoomUserListItem from "./MyRoomUserListItem";

const BASE_URL = `${process.env.NANUM_USER_SERVICE_BASE_URL}`;

function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

const MyRoomUserList = ({ roomInfo }) => {
  const userValue = useRecoilValue(userState);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (!isEmptyObject(roomInfo)) {
      const nextUserIds = roomInfo.userIds.filter((id) => userValue.id !== id);
      console.log(nextUserIds);
      if (nextUserIds.length >= 1) {
        // 이웃이 존재하는 경우
        const API_URI = `/houses/users/lists/${nextUserIds}`;
        get(BASE_URL, API_URI)
          .then((res) => res.data)
          .then((data) => setUserList(data.result))
          .catch((err) => console.log(err));
      }
    }
  }, [roomInfo]);

  return (
    <div className="room_user_list_wrapper">
      <ul className={styles.room_user_list}>
        {userList &&
          userList.map((listItem, index) => (
            <Fragment key={listItem.id}>
              <MyRoomUserListItem key={listItem.id} listItem={listItem} />
              {index < userList.length - 1 ? <Divider /> : ""}
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default MyRoomUserList;
