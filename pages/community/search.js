import React, { useEffect, useState } from "react";
import BoardSearchFilter from "../../components/BoardSearchFilter";

import SearchHeader from "../../components/common/SearchHeader";
import NoticeList from "../../components/NoticeList";
import Slide from "@mui/material/Slide";
import { getSearch } from "../../lib/apis/board";
import styles from "../../styles/Notice.module.css";
const Search = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(0);
  const [board, setBoard] = useState(0);
  const [list, setList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [slideState, setSlideState] = useState(true);
  const handleSendSearch = async () => {
    setList([]);
    setCurPage(0);
    setTotalPages(0);
    let sendData = {};
    if (board == 0) {
      sendData = {
        categoryId: category == 0 ? "" : category,
        all: search,
      };
    } else if (board == 1) {
      sendData = {
        categoryId: category == 0 ? "" : category,
        title: search,
      };
    } else {
      sendData = {
        categoryId: category == 0 ? "" : category,
        content: search,
      };
    }
    console.log("sendData", sendData);
    try {
      const result = await getSearch(sendData);
      console.log(result);
      const { totalPages } = result.data.result;
      setCurPage((prev) => prev + 1);
      setTotalPages(totalPages);
      setList(
        result.data.result.content.length > 0 ? result.data.result.content : []
      );
    } catch (e) {
      console.log(`SearchError: ${e}`);
    }
    // setSearch("");
  };

  return (
    <Slide direction="left" in={slideState} mountOnEnter unmountOnExit>
      <div>
        <SearchHeader
          title="검색"
          type="search"
          board={true}
          setSearch={setSearch}
          search={search}
          handleSendSearch={handleSendSearch}
          setSlideState={setSlideState}
        />
        <BoardSearchFilter
          category={category}
          setCategory={setCategory}
          board={board}
          setBoard={setBoard}
        />
        <section className={styles.contents_section}>
          <NoticeList
            list={list}
            searchType={true}
            type={true}
            curPage={curPage}
            setCurPage={setCurPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            search={search}
            categoryId={category}
            board={board}
          />
        </section>
      </div>
    </Slide>
  );
};

export default Search;
