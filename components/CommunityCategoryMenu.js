import { Router, useRouter } from "next/router";
import React from "react";

import styles from "../styles/CommunityCategoryMenu.module.css";

const CommunityCategoryMenu = () => {
  const router = useRouter();
  const handleNotice = () => {
    router.push({
      pathname: `/community/board/notice`,
    });
  };
  const handlAll = () => {
    router.push({
      pathname: `/community/board/all`,
    });
  };
  const handleInfo = () => {
    router.push({
      pathname: `/community/board/info`,
    });
  };
  return (
    <div className="category_menu_wrapper">
      <ul className={styles.category_menu_list}>
        <li className={styles.list_item} onClick={handleNotice}>
          공지
        </li>
        <li className={styles.list_item} onClick={handlAll}>
          자유
        </li>
        <li className={styles.list_item} onClick={handleInfo}>
          정보
        </li>
      </ul>
    </div>
  );
};

export default CommunityCategoryMenu;
