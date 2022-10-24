import { Chip } from "@mui/material";
import React from "react";

const HostMoveButton = ({
  listItem,
  houseMoveStatus,
  handleContract,
  handleComplete,
}) => {
  switch (houseMoveStatus) {
    case "WAITING":
      return (
        <Chip
          label="입주 계약"
          variant="outlined"
          onClick={() => handleContract(listItem.id)}
        />
      );
      break;
    case "CONTRACTING":
      return (
        <Chip
          label="입주 계약 완료"
          variant="outlined"
          onClick={() => handleComplete(listItem.id)}
        />
      );
      break;
    case "REJECTED":
      return <Chip label="입주 거부" />;
      break;
    case "CANCELED":
      return <Chip label="입주 취소" />;
      break;
    case "CONTRACT_COMPLETED":
      return <Chip label="입주 계약 완료" />;
      break;
  }
};

export default HostMoveButton;
