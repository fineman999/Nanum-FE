import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import React from "react";
import { put } from "../../lib/apis/apiClient";
import { fireAlert } from "../common/Alert";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const MoveContractFormModal = ({
  open,
  handleClose,
  moveList,
  setMoveList,
  moveForm,
  handleClickDate,
}) => {
  const handleSubmit = () => {
    const nextMoveList = moveList.map((listItem) =>
      moveForm.moveInId === listItem.id
        ? { ...listItem, moveInStatus: "CONTRACT_COMPLETED" }
        : listItem
    );
    const API_URI = `/move-in`;
    const formData = {
      moveInId: moveForm.moveInId,
      moveInStatus: "CONTRACT_COMPLETED",
      expireDate: moveForm.expireDate,
    };
    // 입주 계약 완료 API 요청
    put(BASE_URL, API_URI, formData)
      .then((res) => {
        console.log(res);

        const { status } = res;
        const { isSuccess, message, result } = res.data;
        if (status === 200 && isSuccess) {
          fireAlert({ icon: "success", title: result });
          setMoveList(nextMoveList);
          handleClose();
        }
      })
      .catch((err) => console.log(err));
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
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "1px solid #f5f5f5",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <h3>계약 만료 날짜</h3>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="year"
              value={moveForm.expireDate}
              onChange={handleClickDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>

          <Box
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              계약 완료
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MoveContractFormModal;
