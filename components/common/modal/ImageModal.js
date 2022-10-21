import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import css from "styled-jsx/css";
import { TwoButtonOption } from "../Button";

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
    width: 10rem;
    height: 10rem;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "300px",
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
export default function ImageModal({
  open,
  handleClose,
  imageSrc,
  setImageSrc,
  setImageFile,
  sendS3,
}) {
  //이미지 미리보기
  const encodeFileToBase64 = (fileBob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBob);
    setImageFile(fileBob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        console.log(reader.result);
        resolve();
      };
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            UPLOAD IMAGE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label htmlFor="input-file">
              {imageSrc == "" ? (
                <img src="/icons/ico_preview_image_add.png" alt="deafult_png" />
              ) : (
                <img src={imageSrc} alt="image_upload" />
              )}
            </label>
            <input
              type="file"
              id="input-file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TwoButtonOption
              text1="전송"
              text2="취소"
              handleBtn1={sendS3}
              handleBtn2={handleClose}
            />
          </Typography>
        </Box>
      </Modal>
      <style jsx>{mystyle}</style>
    </div>
  );
}
