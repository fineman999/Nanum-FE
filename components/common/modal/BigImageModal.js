import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import css from "styled-jsx/css";

const mystyle = css`
  img {
    width: 100%;
    height: 100%;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "300px",
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

export default function BigImageModal({ open, handleClose, image }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={image} alt="big_img" />
        </Box>
      </Modal>
      <style jsx>{mystyle}</style>
    </div>
  );
}
