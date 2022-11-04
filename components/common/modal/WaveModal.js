import * as React from "react";
import css from "styled-jsx/css";
import { useState } from "react";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import { IconButton, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

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
`;
const style = {
  boxShadow: "0px 0px 4px -2px",
  color: "inherit",
  bgcolor: "background.paper",
  width: "3rem",
  height: "1.5rem",
  borderRadius: "1.5rem",
};
const emoticonList = [
  "/icons/wave.gif",
  "/icons/like.gif",
  "/icons/okay.gif",
  "/icons/no.gif",
];
export default function WaveModal({ sender, username, img, ws }) {
  const openInfoEvent = () => {
    let obj = {
      sender: sender,
      message: emoticonList[0],
      username: username,
      type: "EMOTICON",
      createAt: new Date(),
      img: img,
    };
    ws.current.send(JSON.stringify(obj));
  };
  const openLikeEvent = () => {
    let obj = {
      sender: sender,
      message: emoticonList[1],
      username: username,
      type: "EMOTICON",
      createAt: new Date(),
      img: img,
    };
    ws.current.send(JSON.stringify(obj));
  };
  const openOkayEvent = () => {
    let obj = {
      sender: sender,
      message: emoticonList[2],
      username: username,
      type: "EMOTICON",
      createAt: new Date(),
      img: img,
    };
    ws.current.send(JSON.stringify(obj));
  };
  const openNoEvent = () => {
    let obj = {
      sender: sender,
      message: emoticonList[3],
      username: username,
      type: "EMOTICON",
      createAt: new Date(),
      img: img,
    };
    ws.current.send(JSON.stringify(obj));
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={{ xs: 2, sm: 2, md: 4 }}
        style={{
          marginLeft: "0.1rem",
          overflow: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <IconButton
          sx={style}
          size="medium"
          color="inherit"
          // aria-label="add"
          onClick={openInfoEvent}
        >
          <SignLanguageIcon />
        </IconButton>
        <IconButton
          sx={style}
          size="medium"
          color="inherit"
          onClick={openLikeEvent}
        >
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton
          sx={style}
          size="medium"
          color="inherit"
          // aria-label="add"
          onClick={openOkayEvent}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          sx={style}
          size="medium"
          color="inherit"
          // aria-label="add"
          onClick={openNoEvent}
        >
          <DoNotTouchIcon />
        </IconButton>
      </Stack>

      <style jsx>{mystyle}</style>
    </div>
  );
}
