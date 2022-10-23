import * as React from "react";
import { IconButton } from "@mui/material";
import css from "styled-jsx/css";
import * as Api from "../../../lib/apis/apiClient";
import { useState } from "react";
import { ProfileImg } from "../Profile";
import ListSubheader from "@mui/material/ListSubheader";
import { dateTimeForLocalTime } from "../../../lib/utils/useful-functions";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
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
`;
const style = {
  position: "absolute",
  top: "90.5%",
  left: "70%",
  transform: "translate(-40%, -80%)",
  // opacity: 0.5,
  boxShadow: "0px 0px 5px -2px",
  bgcolor: "background.paper",
  width: "60px",
  height: "20px",
  borderRadius: "30px",
};
export default function LikeModal({ sender, username, img, ws }) {
  const [openInfo, setOpenInfo] = useState(false);
  const [state, setState] = useState({
    bottom: false,
  });
  const [chatUsers, setChatUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const anchor = "bottom";
  const openInfoEvent = () => {
    console.log("Hi");
    let obj = {
      sender: sender,
      message: "/icons/like.gif",
      username: username,
      type: "EMOTICON",
      createAt: new Date(),
      img: img,
    };
    console.log(obj);
    ws.current.send(JSON.stringify(obj));
  };

  return (
    <div>
    <IconButton
        sx={style}
        size="medium"
        color="inherit"
        // aria-label="add"
        // onClick={openInfoEvent}
      >
        <ThumbUpOffAltIcon onClick={openInfoEvent} />
        {/* <img src="/icons/wave.gif" /> */}
      </IconButton>

      <style jsx>{mystyle}</style>
    </div>
  );
}
