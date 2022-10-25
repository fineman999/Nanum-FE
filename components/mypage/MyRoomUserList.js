import { Divider } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { get } from "../../lib/apis/apiClient";
import styles from "../../styles/MyRoomUserList.module.css";
import MyRoomUserListItem from "./MyRoomUserListItem";

const BASE_URL = `${process.env.NANUM_USER_SERVICE_BASE_URL}`;

const MyRoomUserList = ({ userInfo }) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const API_URI = `/houses/users/lists/1,3`;
    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => setUserList(data.result))
      .catch((err) => console.log(err));
  }, []);

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
