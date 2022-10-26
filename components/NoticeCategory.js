import Link from "next/link";
import React from "react";
import styles from "../styles/NoticeCategory.module.css";
import NoticeList from "./NoticeList";

const NoticeCategory = ({ list }) => {
  console.log("NoticeCategory,,,", list);
  return (
    <div className={styles.category_container}>
      <div className={styles.category_header}>
        <h2 className={styles.title}>공지사항</h2>
        <span className={styles.more_btn}>
          <Link href="/community/board/notice">
            <a style={{ color: "#76c1b2" }}>더보기</a>
          </Link>
        </span>
      </div>
      <div className="category_body">
        <NoticeList list={list} key={1} />
      </div>
    </div>
  );
};

export default NoticeCategory;
