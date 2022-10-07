import React from "react";
import SubHeader from "../../../components/common/SubHeader";
import NoticeList from "../../../components/NoticeList";
import WriteButton from "../../../components/WriteButton";

import styles from "../../../styles/Info.module.css";

const info = () => {
  return (
    <>
      <SubHeader title="정보" type="info" />
      <section className={styles.contents_section}>
        <NoticeList />
      </section>
      <WriteButton />
    </>
  );
};

export default info;
