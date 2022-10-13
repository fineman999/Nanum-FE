import { Button, TextField } from "@mui/material";
import React from "react";

import styles from "../styles/HouseKeywordForm.module.css";
import HouseKeywordList from "./HouseKeywordList";

const HouseKeywordForm = ({
  form,
  keyword,
  addKeyword,
  changeKeyword,
  removeKeyword,
}) => {
  return (
    <>
      <div className={styles.house_keyword_wrapper}>
        <TextField
          id="outlined-basic"
          name="keyWord"
          value={keyword || ""}
          label="키워드"
          variant="outlined"
          onChange={changeKeyword}
          sx={{ flexGrow: 1, mr: 1 }}
        />
        <Button variant="outlined" onClick={addKeyword}>
          추가
        </Button>
      </div>
      <br />
      <HouseKeywordList form={form} removeKeyword={removeKeyword} />
    </>
  );
};

export default HouseKeywordForm;
