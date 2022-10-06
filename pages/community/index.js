import React from "react";
import SubHeader from "../../components/common/SubHeader";
import Footer from "../../components/common/Footer";
import BottomMenu from "../../components/common/BottomMenu";
import NoticeCategory from "../../components/NoticeCategory";

import styles from "../../styles/Community.module.css";
import CommunityCategoryMenu from "../../components/CommunityCategoryMenu";
import AllCategory from "../../components/AllCategory";
import InfoCategory from "../../components/InfoCategory";
const Community = () => {
  return (
    <>
      <SubHeader title="커뮤니티" type="community" />
      {/* 카테고리 메뉴 */}
      <CommunityCategoryMenu />
      {/* 커뮤니티 카테고리 */}
      <section className={styles.category_section}>
        <NoticeCategory />
        <AllCategory />
        <InfoCategory />
      </section>
      <Footer />
      <BottomMenu />
    </>
  );
};

export default Community;
