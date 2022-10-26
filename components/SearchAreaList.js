import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import styles from "../styles/SearchAreaRadioGroup.module.css";

const areaList = [
  { name: "전국", value: "all" },
  { name: "서울", value: "seoul" },
  { name: "경기", value: "gyeong-gi" },
  { name: "인천", value: "incheon" },
  { name: "부산", value: "busan" },
  { name: "대구", value: "daegu" },
  { name: "대전", value: "daejeon" },
  { name: "경남", value: "gyeongnam" },
  { name: "전남", value: "jeonnam" },
  { name: "충남", value: "chungnam" },
  { name: "광주", value: "goyang" },
  { name: "울산", value: "ulsan" },
  { name: "경북", value: "gyeongbug" },
  { name: "전북", value: "jeonbug" },
  { name: "충북", value: "chungbug" },
  { name: "강원", value: "gang-won" },
  { name: "제주", value: "jejudo" },
  { name: "세종", value: "sejong" },
];

const SearchAreaRadioGroup = ({ handleChange }) => {
  return (
    <div className={styles.search_area_radio_group}>
      <FormControl variant="outlined">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "200px",
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
                sx={{ flexGrow: 1 }}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SearchAreaRadioGroup;
