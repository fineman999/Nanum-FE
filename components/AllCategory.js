import Link from "next/link";
import React from "react";
import styles from "../styles/AllCategory.module.css";
import NoticeList from "./NoticeList";
const AllCategory = ({ list }) => {
  return (
    <div className={styles.category_container}>
      <div className={styles.category_header}>
        <h2 className={styles.title}>자유게시판</h2>
        <span className={styles.more_btn}>
          <Link href="/community/board/all">
            <a style={{ color: "#76c1b2" }}>더보기</a>
          </Link>
        </span>
      </div>
      <div className="category_body">
        <NoticeList list={list} />
      </div>
    </div>
  );
};

export default AllCategory;
