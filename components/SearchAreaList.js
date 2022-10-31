import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import styles from "../styles/SearchAreaRadioGroup.module.css";

const areaList = [
  { name: "전국", value: "전국" },
  { name: "서울", value: "서울" },
  { name: "경기", value: "경기" },
  { name: "인천", value: "인천" },
  { name: "부산", value: "부산" },
  { name: "대구", value: "대구" },
  { name: "대전", value: "대전" },
  { name: "경남", value: "경남" },
  { name: "전남", value: "전남" },
  { name: "충남", value: "충남" },
  { name: "광주", value: "광주" },
  { name: "울산", value: "울산" },
  { name: "경북", value: "경북" },
  { name: "전북", value: "전북" },
  { name: "충북", value: "충북" },
  { name: "강원", value: "강원" },
  { name: "제주", value: "제주" },
  { name: "세종", value: "세종" },
];

const SearchAreaRadioGroup = ({ handleChange }) => {
  return (
    <div className={styles.search_area_radio_group}>
      <FormControl variant="outlined" sx={{ width: "100%", padding: "10px" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="전국"
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "200px",
            margin: "0 auto",
            boxSizing: "border-box",
            overflow: "auto",
          }}
          onChange={handleChange}
        >
          {areaList &&
            areaList.map((listItem, index) => (
              <FormControlLabel
                key={index}
                name="searchArea"
                value={listItem.value}
                control={<Radio />}
                label={listItem.name}
                labelPlacement="bottom"
              />
            ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SearchAreaRadioGroup;
