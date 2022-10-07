import React from "react";
import SubHeader from "../../../components/common/SubHeader";
import NoticeList from "../../../components/NoticeList";
import WriteButton from "../../../components/WriteButton";
import styles from "../../../styles/All.module.css";

const all = () => {
  return (
    <>
      <SubHeader title="전체" type="all" />
      <section className={styles.contents_section}>
        <NoticeList />
      </section>
      <WriteButton />
    </>
  );
};

export default all;
