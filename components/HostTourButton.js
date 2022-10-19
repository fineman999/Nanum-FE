import { Chip } from "@mui/material";

const HostTourButton = ({ contract, tourStatus, handleReject }) => {
  switch (tourStatus) {
    case "WAITING":
      return (
        <>
          <Chip
            label="승인"
            variant="outlined"
            onClick={() => console.log("투어 승인!")}
            sx={{ mr: 0.5 }}
          />
          <Chip
            label="거부"
            variant="outlined"
            onClick={() => handleReject(contract.id)}
          />
        </>
      );
      break;
    case "APPROVED":
      return (
        <Chip
          label="투어 완료"
          variant="outlined"
          onClick={() => console.log("투어 완료!")}
        />
      );
      break;
    case "REJECTED":
      return <Chip label="투어 거부됨" />;
      break;
    case "CANCELED":
      return <Chip label="투어 취소됨" />;
      break;
    case "TOUR_COMPLETED":
      return <Chip label="투어 완료됨" />;
      break;
  }
};

export default HostTourButton;
