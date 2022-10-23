import { useState } from "react";
import { useRecoilValue } from "recoil";
import { getChat, postChat } from "../../lib/apis/chat";
import { userState } from "../../state/atom/authState";
import ProfileModal from "./modal/ProfileModal";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { fireAlert } from "./Alert";
export function ChatListItem({ img, size, name, type, id, primary }) {
  //modal 관리
  const [open, setOpen] = useState(false);
  const userData = useRecoilValue(userState);
  const [roomNum, setRoomNum] = useState(undefined);
  const makeChat = () => {
    let obj = {
      userIds: [id, userData.id],
      houseId: 0,
      roomName: "",
      houseImg: "/images/default.png",
    };
    postChat(obj)
      .then((res) => {
        setRoomNum(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getChatState = () => {
    const houseId = 0;
    const users = [id, userData.id];
    getChat({ houseId, users })
      .then((res) => {
        setRoomNum(res.data.id);
        if (res.data.id === undefined) {
          makeChat();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOpen = () => {
    if (userData.id != id) {
      setOpen(true);
      getChatState();
    } else {
      fireAlert({ icon: "info", title: "본인의 아이디입니다." });
    }
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <ListItemButton onClick={() => handleOpen()}>
        <img
          src={img}
          style={{
            width: `${size}vh`,
            height: `${size}vh`,
            borderRadius: "100%",
          }}
        />
        <ListItemText primary={primary} sx={{ marginLeft: "2rem" }} />
      </ListItemButton>
      <ProfileModal
        open={open}
        handleClose={handleClose}
        img={img}
        type={type}
        name={name}
        id={id}
        roomNum={roomNum}
      />
    </>
  );
}
