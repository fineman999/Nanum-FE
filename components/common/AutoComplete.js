import React from "react";
import KeywordList from "./KeywordList";
import styles from "../../styles/AutoComplete.module.css";

const tempKeywords = ["사과", "배", "포도", "오렌지", "수박"];

const AutoComplete = ({ searchInput }) => {
  if (!searchInput) {
    return null;
  }

  return (
    <div className={styles.auto_complete_wrapper}>
      <KeywordList keywords={tempKeywords} />
    </div>
  );
};

export default AutoComplete;
