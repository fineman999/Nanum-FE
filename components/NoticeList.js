import React, { Fragment, useEffect, useState } from "react";
import NoticeListItem from "./NoticeListItem";
import { Divider } from "@mui/material";
import axios from "axios";
import * as Api from "../lib/apis/apiClient";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { getSearchV2 } from "../lib/apis/board";

const LastPageComment = () => {
  const ScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const style = {
    width: "100%",
    height: "60px",
    color: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={style}>
      마지막 페이지입니다.{" "}
      <ArrowDropUpIcon fontSize="large" onClick={ScrollToTop} />
    </div>
  );
};
const FristCompoment = () => {
  const style = {
    width: "100%",
    height: "60px",
    color: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return <div style={style}>검색어를 입력하세요. </div>;
};

const NoticeList = ({
  list,
  type,
  setCurPage,
  curPage,
  totalPages,
  setTotalPages,
  category,
  searchType = false,
  search = "",
  categoryId = "",
  board = 0,
}) => {
  const [boards, setBoards] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (list && list.length > 0 && !searchType) {
      setBoards(list);
    } else if (list && searchType) {
      setBoards(list);
    }
  }, [list]);

  const fetchMoreData = () => {
    if (curPage === totalPages) {
      setHasMore(false);
      return;
    }

    const fetchApi = async () => {
      try {
        const response = await Api.get(
          `https://nanum.site/board-service/api/v1/posts/category/${category}?page=${curPage}&size=20`,
          ""
        );
        console.log(response);
        const { content } = response.data.result;
        console.log(" 목록 ", content);

        setBoards((prev) => {
          return prev.concat(content);
        });
        setCurPage((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  };
  const fetchMoreDataSearch = () => {
    if (curPage === totalPages) {
      setHasMore(false);
      return;
    }
    const fetchSearchApi = async () => {
      try {
        const response = await getSearchV2({
          search,
          categoryId,
          board,
          curPage,
        });
        console.log(response);
        const { content } = response.data.result;
        console.log(" 목록 ", content);

        setBoards((prev) => {
          return prev.concat(content);
        });
        setCurPage((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearchApi();
  };

  return (
    <div className="notice_list_wrapper">
      <ul className="notice_list">
        {boards && boards.length <= 0 ? (
          <FristCompoment />
        ) : type ? (
          <InfiniteScroll
            dataLength={boards.length}
            next={searchType ? fetchMoreDataSearch : fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<LastPageComment />}
          >
            {boards &&
              boards.map((item, idx) => (
                <Fragment key={idx}>
                  <Divider />
                  <NoticeListItem
                    id={item.id}
                    date={item.createAt}
                    title={item.title}
                    viewCount={item.viewCount}
                    content={item.content}
                    type={type}
                  />
                </Fragment>
              ))}
          </InfiniteScroll>
        ) : (
          boards &&
          boards.map((item, idx) => (
            <Fragment key={item.id}>
              <Divider />
              <NoticeListItem
                id={item.id}
                date={item.createAt}
                title={item.title}
                viewCount={item.viewCount}
                content={item.content}
                type={type}
              />
            </Fragment>
          ))
        )}
        {/* {type ? (
          <InfiniteScroll
            dataLength={boards.length}
            next={searchType ? fetchMoreDataSearch : fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<LastPageComment />}
          >
            {boards &&
              boards.map((item, idx) => (
                <Fragment key={idx}>
                  <Divider />
                  <NoticeListItem
                    id={item.id}
                    date={item.createAt}
                    title={item.title}
                    viewCount={item.viewCount}
                    content={item.content}
                    type={type}
                  />
                </Fragment>
              ))}
          </InfiniteScroll>
        ) : (
          boards &&
          boards.map((item, idx) => (
            <Fragment key={item.id}>
              <Divider />
              <NoticeListItem
                id={item.id}
                date={item.createAt}
                title={item.title}
                viewCount={item.viewCount}
                content={item.content}
                type={type}
              />
            </Fragment>
          ))
        )} */}
      </ul>
    </div>
  );
};

export default NoticeList;
