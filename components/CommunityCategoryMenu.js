import React from "react";

import styles from "../styles/CommunityCategoryMenu.module.css";

const CommunityCategoryMenu = () => {
  return (
    <div className="category_menu_wrapper">
      <ul className={styles.category_menu_list}>
        <li className={styles.list_item}>전체</li>
        <li className={styles.list_item}>공지</li>
        <li className={styles.list_item}>자유</li>
        <li className={styles.list_item}>정보</li>
      </ul>
    </div>
  );
};

export default CommunityCategoryMenu;
