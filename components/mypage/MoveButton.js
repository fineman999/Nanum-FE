import { Chip } from "@mui/material";
import React from "react";

const MoveButton = ({ houseMoveStatus, handleCancel }) => {
  switch (houseMoveStatus) {
    case "WAITING":
      return (
        <Chip
          label="입주 취소"
          variant="outlined"
          onClick={() => alert("입주 신청 취소!")}
        />
      );
      break;
    case "APPROVED":
      return <Chip label="입주 승인" />;
      break;
    case "REJECTED":
      return <Chip label="입주 거부" />;
      break;
    case "CANCELED":
      return <Chip label="입주 취소" />;
      break;
    case "MOVE_COMPLETED":
      return <Chip label="입주 완료" />;
      break;
  }
};

export default MoveButton;
