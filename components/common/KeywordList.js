import React from "react";
import KeywordListItem from "./KeywordListItem";

import styles from "../../styles/KeywordList.module.css";
import { Paper } from "@mui/material";

const KeywordList = ({ keywords }) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <ul className={styles.keyword_list}>
        {keywords &&
          keywords.map((keyword, index) => (
            <KeywordListItem key={index} keyword={keyword} />
          ))}
      </ul>
    </Paper>
  );
};

export default KeywordList;
