import Link from "next/link";
import React from "react";

import styles from "../styles/MyHouseButtons.module.css";

const MyHouseButtons = () => {
  return (
    <div className={styles.my_house_button_wrapper}>
      <div className={styles.my_house_edit_wrapper}>
        <Link href="/host/house/add">
          <a className={styles.addBtn}>등록</a>
        </Link>
        <a className={styles.editBtn} onClick={() => alert("준비중입니다...")}>
          편집
        </a>
      </div>
    </div>
  );
};

export default MyHouseButtons;
