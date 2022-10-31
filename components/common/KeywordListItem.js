import React from "react";

import styles from "../../styles/KeywordListItem.module.css";

const KeywordListItem = ({ keyword }) => {
  return <li className={styles.keyword_list_item}>{keyword}</li>;
};

export default KeywordListItem;
