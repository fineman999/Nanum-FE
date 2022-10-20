import React from "react";
import { StaticDatePicker } from "@mui/x-date-pickers";

const MoveDateForm = ({ moveForm, handleClickDate }) => {
  return (
    <div>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="year"
        value={moveForm.moveDate}
        onChange={handleClickDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default MoveDateForm;
