import { TextField } from "@mui/material";
import React from "react";

import styles from "../styles/HouseDescForm.module.css";

const HouseDescForm = ({ form, changeForm }) => {
  return (
    <div className={styles.house_desc_wrapper}>
      {/* 하우스 이름 */}
      <TextField
        id="outlined-basic"
        name="houseName"
        value={form.houseRequest.houseName || ""}
        label="하우스 이름"
        variant="outlined"
        onChange={changeForm}
        sx={{ width: "100%", mb: 2 }}
        required
      />

      {/* 하우스 소개 */}
      <TextField
        id="outlined-multiline-flexible"
        name="explanation"
        value={form.houseRequest.explanation || ""}
        label="하우스 소개"
        multiline
        maxRows={20}
        onChange={changeForm}
        sx={{ width: "100%" }}
        required
      />
    </div>
  );
};

export default HouseDescForm;
