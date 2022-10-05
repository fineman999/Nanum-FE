import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import css from "styled-jsx/css";
import { TwoButtonOption } from "../Button";
import CloseIcon from "@mui/icons-material/Close";
import "swiper/css/pagination";
import "swiper/css/navigation";

const mystyle = css`
  .house_image_wrapper {
    height: 30vh;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal({ open, handleClose, img, name, type }) {
  const goChat = () => {};
  const goBlock = () => {};
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div onClick={handleClose}>
            <CloseIcon style={{ position: "fixed", right: "2rem" }} />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <img src={img} />
            </div>
            <p style={{ textAlign: "center" }}>{name}</p>
          </Typography>
          {type == 1 ? (
            <TwoButtonOption
              text1="채팅하기"
              text2="차단하기"
              handleBtn1={goChat}
              handleBtn2={goBlock}
            />
          ) : (
            <TwoButtonOption
              text1="쪽지보내기"
              text2="차단하기"
              handleBtn1={goChat}
              handleBtn2={goBlock}
            />
          )}
        </Box>
      </Modal>
      <style jsx>{mystyle}</style>
    </div>
  );
}
