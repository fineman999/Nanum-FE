import React, { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import styles from "../styles/HouseDateForm.module.css";
import formatDate from "../lib/fomatDate";

const HouseDateForm = ({ tourForm, setTourForm, onWarning }) => {
  const [value, setValue] = useState();

  const handleChange = (newValue) => {
    if (tourForm.roomId === "") {
      onWarning();
      return null;
    }
    setTourForm({
      ...tourForm,
      tourDate: formatDate(newValue.toDate()),
      timeId: "",
    });
    setValue(newValue);
  };

  return (
    <div className={styles.house_tour_date_form_wrapper}>
      <DesktopDatePicker
        label="날짜"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} sx={{ width: "100%" }} />
        )}
      />
    </div>
  );
};

export default HouseDateForm;
