import React from "react";
import SubHeader from "../../components/common/SubHeader";
import NoticeList from "../../components/NoticeList";
import WriteButton from "../../components/WriteButton";
import styles from "../../styles/Notice.module.css";

const notice = () => {
  return (
    <>
      <SubHeader title="공지" type="notice" />
      <section className={styles.contents_section}>
        <NoticeList />
      </section>
      <WriteButton />
    </>
  );
};

export default notice;
