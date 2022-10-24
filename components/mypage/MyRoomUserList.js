import { Divider } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import styles from "../../styles/MyRoomUserList.module.css";
import MyRoomUserListItem from "./MyRoomUserListItem";

const userList = [
  { id: 1, name: "안대현" },
  { id: 2, name: "강민수" },
  { id: 3, name: "전호정" },
  { id: 4, name: "박찬흠" },
  { id: 5, name: "곽찬영" },
];

const MyRoomUserList = ({ userInfo }) => {
  useEffect(() => {}, []);

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
