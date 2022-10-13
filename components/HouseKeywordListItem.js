import { Chip } from "@mui/material";
import React from "react";

import styles from "../styles/HouseKeywordListItem.module.css";

const HouseKeywordListItem = ({ keyword, removeKeyword }) => {
  return (
    <li className={styles.keyword_list_item}>
      <Chip label={keyword} onDelete={() => removeKeyword(index)} />
    </li>
  );
};

export default HouseKeywordListItem;
