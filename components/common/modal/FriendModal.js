import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Fab from "@mui/material/Fab";
import css from "styled-jsx/css";
import * as Api from "../../../lib/apis/apiClient";
import { useState } from "react";
import { ProfileImg } from "../Profile";
import ListSubheader from "@mui/material/ListSubheader";
import { dateTimeForLocalTime } from "../../../lib/utils/useful-functions";
import { ChatListItem } from "../ChatListIem";
const mystyle = css`
  .input-file-button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 20vh;
    padding: 0.4rem 0.8rem;
  }

  img {
    width: 2rem;
  }
  #room_info {
    display: flex;
    justify-content: space-between;
    margin: 0 0.4rem;
  }
  .MuiPaper-root
    .MuiPaper-elevation
    .MuiPaper-elevation16
    .MuiDrawer-paper
    .MuiDrawer-paperAnchorBottom
    .css-9emuhu-MuiPaper-root-MuiDrawer-paper {
    border-radius: 2vh;
  }
`;
const style = {
  position: "absolute",
  // top: "50%",
  left: "95%",
  transform: "translate(-95%,0)",
  // opacity: 0.5,
  boxShadow: "0px 3px 5px -1px",
  bottom: "80px",
  bgcolor: "background.paper",
  width: "5rem",
  height: "1.5rem",
  // float: "right",
  borderRadius: "2.5rem",
};
export default function FriendModal({ roomNum }) {
  const [openInfo, setOpenInfo] = useState(false);
  const [state, setState] = useState({
    bottom: false,
  });
  const [chatUsers, setChatUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const anchor = "bottom";
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (React.KeyboardEvent.key === "Tab" || React.KeyboardEvent.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const openInfoEvent = async () => {
    setOpenInfo(true);

    try {
      const getRooms = await Api.get(
        `https://nanum.site/web-flux-service/api/v1/rooms/`,
        roomNum
      );
      if (!getRooms) {
        throw new Error(`${getRooms} not allowd`);
      }

      setRoomInfo({
        id: getRooms.data.id,
        houseId: getRooms.data.houseId,
        roomName: getRooms.data.roomName,
        count: getRooms.data.roomInfo.users.length,
        createAt: getRooms.data.createAt,
      });
      const users = getRooms.data.roomInfo.users.map((user) => user.userId);

      const getUsers = await Api.get(
        `https://nanum.site/user-service/api/v1/users/particular?param=`,
        users
      );
      if (!getUsers) {
        throw new Error(`${getUsers} not allowd`);
      }
      const newUsers = getUsers.data.result.map((idx) => {
        return {
          id: idx.id,
          email: idx.id,
          nickName: idx.nickName,
          profileImgUrl: idx.profileImgUrl,
        };
      });
      setChatUsers(newUsers);
    } catch (e) {
      console.log("Error" + e);
    }
  };

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{ lineStyle: "40px" }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <div
              id="room_info"
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0 0.4rem",
                height: "2.5rem",
              }}
            >
              <div style={{ color: "black", fontWeight: 600 }}>
                {roomInfo.houseId === 0
                  ? "대화상대"
                  : `'${roomInfo.roomName}' 의  대화상대`}
              </div>
              <div style={{ fontWeight: 300 }}>
                {`${roomInfo.count}명 참여중`}
              </div>
            </div>
            {roomInfo.houseId === 0 ? (
              ""
            ) : (
              <div
                style={{
                  margin: "0 0.5rem",
                  fontWeight: "lighter",
                  fontSize: "0.7rem",
                  height: "1.5rem",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {`개설일: ${dateTimeForLocalTime(roomInfo.createAt)}`}
              </div>
            )}
          </ListSubheader>
        }
      >
        <Divider />
        {chatUsers.map((user, index) => (
          <ListItem key={user.id} disablePadding>
            {/* <ListItemButton>
              <ProfileImg
                img={user.profileImgUrl}
                name={user.nickName}
                size={5}
                type={0}
                id={user.id}
              />
              <ListItemText
                primary={user.nickName}
                sx={{ marginLeft: "2rem" }}
              />
            </ListItemButton> */}
            <ChatListItem
              img={user.profileImgUrl}
              name={user.nickName}
              size={5}
              type={2}
              id={user.id}
              primary={user.nickName}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <Fab
        sx={style}
        size="medium"
        color="inherit"
        aria-label="add"
        onClick={openInfoEvent}
      >
        <img src="/icons/friend.png" />
      </Fab>

      <SwipeableDrawer
        anchor={"bottom"}
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        onOpen={() => setOpenInfo(false)}
      >
        {list("bottom")}
      </SwipeableDrawer>

      <style jsx>{mystyle}</style>
    </div>
  );
}
