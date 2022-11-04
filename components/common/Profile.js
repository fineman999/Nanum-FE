import { useState } from "react";
import { useRecoilValue } from "recoil";
import { getChat, postChat } from "../../lib/apis/chat";
import { userState } from "../../state/atom/authState";
import ProfileModal from "./modal/ProfileModal";

export function ProfileImg({ img, size, name, type, id }) {
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
    setOpen(true);
    getChatState();
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div id="profile">
        <img
          src={img}
          onClick={() => handleOpen()}
          style={{
            width: `${size}vh`,
            height: `${size}vh`,
            borderRadius: "100%",
          }}
        />
      </div>
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
