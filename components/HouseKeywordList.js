import React from "react";

import styles from "../styles/HouseKeywordList.module.css";
import HouseKeywordListItem from "./HouseKeywordListItem";

const HouseKeywordList = ({ form, removeKeyword }) => {
  return (
    <ul className={styles.house_keyword_list}>
      {form.houseRequest.keyWord &&
        form.houseRequest.keyWord.map((keyWord, index) => (
          <HouseKeywordListItem
            key={index}
            keyword={keyWord}
            removeKeyword={removeKeyword}
          />
        ))}
    </ul>
  );
};

export default HouseKeywordList;
