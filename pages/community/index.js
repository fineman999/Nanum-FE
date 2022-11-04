import React, { useEffect, useState } from "react";
import SubHeader from "../../components/common/SubHeader";
import Footer from "../../components/common/Footer";
import BottomMenu from "../../components/common/BottomMenu";
import NoticeCategory from "../../components/NoticeCategory";
import CommunityCategoryMenu from "../../components/CommunityCategoryMenu";
import AllCategory from "../../components/AllCategory";
import InfoCategory from "../../components/InfoCategory";
import styles from "../../styles/Community.module.css";
import axios from "axios";
import * as Api from "../../lib/apis/apiClient";
import { getAll, getInfo, getNotice } from "../../lib/apis/board";
const Community = () => {
  const [notice, setNotice] = useState({});
  const [all, setAll] = useState({});
  const [info, setInfo] = useState({});
  useEffect(() => {
    // connectSse();
    // getChats();
    const cancelToken = axios.CancelToken.source();
    async function reactive() {
      try {
        const check = await Api.getCancelToken(
          `https://nanum.site/board-service/api/v1/posts/category/1`,
          `?page=0&size=5`,
          cancelToken
        );
        setNotice(check.data.result.content);
        if (!check) {
          throw new Error(`${check} not allowd`);
        }
      } catch (e) {
        console.log("Error" + e);
      }

      try {
        const getAlls = await Api.getCancelToken(
          `https://nanum.site/board-service/api/v1/posts/category/2`,
          `?page=0&size=5`,
          cancelToken
        );
        setAll(getAlls.data.result.content);
        if (!getAlls) {
          throw new Error(`${getAlls} not allowd`);
        }
      } catch (e) {
        console.log("Error" + e);
      }
      try {
        const getInfos = await Api.getCancelToken(
          `https://nanum.site/board-service/api/v1/posts/category/3`,
          `?page=0&size=5`,
          cancelToken
        );
        if (!getInfos) {
          throw new Error(`${getInfos} not allowd`);
        }

        setInfo(getInfos.data.result.content);
      } catch (e) {
        console.log("Error" + e);
      }
    }
    reactive();
    return () => {
      cancelToken.cancel();
    };
  }, []);
  return (
    <>
      <SubHeader title="커뮤니티" type="community" board={true} />
      {/* 카테고리 메뉴 */}
      <CommunityCategoryMenu />
      {/* 커뮤니티 카테고리 */}
      <section className={styles.category_section}>
        <NoticeCategory list={notice} />
        <AllCategory list={all} />
        <InfoCategory list={info} />
      </section>
      <Footer />
      <BottomMenu />
    </>
  );
};

export default Community;
