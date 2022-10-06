import React from "react";
import styles from "../styles/AllCategory.module.css";
import NoticeList from "./NoticeList";
const AllCategory = () => {
  return (
    <div className={styles.category_container}>
      <div className={styles.category_header}>
        <h2 className={styles.title}>전체</h2>
        <span className={styles.more_btn}>더보기</span>
      </div>
      <div className="category_body">
        <NoticeList />
      </div>
    </div>
  );
};

export default AllCategory;
