import { Chip } from "@mui/material";
import React, { useEffect } from "react";
import formDate from "../lib/fomatDate";

const HouseTimeListItem = ({ time, tourForm, handleClick }) => {
  useEffect(() => {
    console.log("houseTimeListItem tourForm: ", tourForm);
    console.log("houseTimeListItem: ", time);
  }, []);

  return (
    <li>
      {formDate(new Date()) >= tourForm.tourDate ? (
        <Chip label={time.time} sx={{ width: "100%" }} />
      ) : time.isAvailable ? (
        <Chip
          label={time.time}
          variant="outlined"
          onClick={() => handleClick(time)}
          sx={{ width: "100%" }}
        />
      ) : (
        <Chip label={time.time} sx={{ width: "100%" }} />
      )}
    </li>
  );
};

export default HouseTimeListItem;
