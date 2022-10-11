import React, { useRef } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostcodeModal = ({ open, handleClose, setForm }) => {
  const modalRef = useRef(null);

  const handleComplete = (data) => {
    const addressForm = {
      zonecode: data.zonecode,
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
    };
    setForm(addressForm);
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      ref={modalRef}
    >
      <Fade in={open}>
        <Box sx={style}>
          <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default PostcodeModal;
