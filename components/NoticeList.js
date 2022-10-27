import React, { useEffect, useState } from "react";
import NoticeListItem from "./NoticeListItem";
import { Divider } from "@mui/material";
import axios from "axios";
import * as Api from "../lib/apis/apiClient";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

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

const NoticeList = ({
  list,
  type,
  setCurPage,
  curPage,
  totalPages,
  setTotalPages,
  category,
}) => {
  const [boards, setBoards] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (list && list.length > 0) {
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

  return (
    <div className="notice_list_wrapper">
      <ul className="notice_list">
        {type ? (
          <InfiniteScroll
            dataLength={boards.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<LastPageComment />}
          >
            {boards &&
              boards.map((item, idx) => (
                <>
                  <Divider />
                  <NoticeListItem
                    id={item.id}
                    key={idx}
                    date={item.createAt}
                    title={item.title}
                    viewCount={item.viewCount}
                    content={item.content}
                    type={type}
                  />
                </>
              ))}
          </InfiniteScroll>
        ) : (
          boards &&
          boards.map((item, idx) => (
            <>
              <Divider />
              <NoticeListItem
                id={item.id}
                key={idx}
                date={item.createAt}
                title={item.title}
                viewCount={item.viewCount}
                content={item.content}
                type={type}
              />
            </>
          ))
        )}
      </ul>
    </div>
  );
};

export default NoticeList;
