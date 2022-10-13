import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

import styles from "../styles/HouseTypeForm.module.css";

const HouseTypeForm = ({ form, changeForm }) => {
  return (
    <div className={styles.house_type_wrapper}>
      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          성별타입
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={form.houseRequest.houseGender}
          name="houseGender"
          autoWidth
          label="성별타입"
          onChange={changeForm}
          required
        >
          <MenuItem value="COMMON">남녀공용</MenuItem>
          <MenuItem value="MALE">남성전용</MenuItem>
          <MenuItem value="FEMALE">여성전용</MenuItem>
        </Select>
      </FormControl>
      <div className="live_type_form">
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-autowidth-label">
            주거타입
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={form.houseRequest.houseType}
            name="houseType"
            autoWidth
            label="주거타입"
            onChange={changeForm}
            required
          >
            <MenuItem value="share">쉐어</MenuItem>
            <MenuItem value="원룸형">마이룸(원룸)</MenuItem>
            <MenuItem value="etc">기타</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default HouseTypeForm;
