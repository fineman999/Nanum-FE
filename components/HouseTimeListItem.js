import { Chip } from "@mui/material";
import React, { useEffect } from "react";
import { fireAlert } from "./common/Alert";

const HouseTimeListItem = ({ time, handleClick }) => {
  return (
    <li>
      {time.isAvailable ? (
        <Chip
          label={time.time}
          variant="outlined"
          onClick={() => handleClick(time)}
          sx={{ width: "100%" }}
        />
      ) : (
        <Chip
          label={time.time}
          sx={{ width: "100%" }}
          onClick={() =>
            fireAlert({
              icon: "warning",
              title: "당일 신청은<br/>불가능합니다.",
            })
          }
        />
      )}
    </li>
  );
};

export default HouseTimeListItem;
