import React, { useEffect, useRef, useState } from "react";
import SubHeader from "../../../components/common/SubHeader";
import NoticeList from "../../../components/NoticeList";
import WriteButton from "../../../components/WriteButton";

import styles from "../../../styles/Notice.module.css";
import * as Api from "../../../lib/apis/apiClient";
import axios from "axios";
import SearchBoard from "../../../components/SearchBoard";

const notice = () => {
  const [notice, setNotice] = useState({});
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const role = useRef(null);
  useEffect(() => {
    role.current = sessionStorage.getItem("role");
    const cancelToken = axios.CancelToken.source();
    async function reactive() {
      try {
        const check = await Api.getCancelToken(
          `https://nanum.site/board-service/api/v1/posts/category/1`,
          `?page=0&size=20`,
          cancelToken
        );
        const { totalPages } = check.data.result;
        setNotice(check.data.result.content);
        setCurPage((prev) => prev + 1);
        setTotalPages(totalPages);
        if (!check) {
          throw new Error(`${check} not allowd`);
        }
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
      <SubHeader title="공지" type="notice" board={true} />
      <section className={styles.contents_section}>
        <NoticeList
          list={notice}
          type={true}
          curPage={curPage}
          setCurPage={setCurPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          category={1}
        />
      </section>
      {role.current === "HOST" ? <WriteButton /> : ""}
    </>
  );
};

export default notice;
