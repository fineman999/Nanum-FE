import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

import CommentListItem from "../community/CommentListItem";
import * as Api from "../../lib/apis/apiClient";
import axios from "axios";

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
const CommentList = ({
  boardId,
  newComment,
  setInputCommnet,
  inputCommnet,
  newReply,
}) => {
  const [commentList, setCommentList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [defaultSize, setDefaultSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const cancleToken = axios.CancelToken.source();
    async function reactive() {
      try {
        const getComments = await Api.get(
          `https://nanum.site/board-service/api/v1/board/reply/`,
          boardId
        );
        setCommentList(getComments.data.result.content);

        const { totalPages } = getComments.data.result;

        setCurPage((prev) => prev + 1);
        setTotalPages(totalPages);
        if (!getComments) {
          throw new Error(`${getComments} not allowd`);
        }
        return getComments;
      } catch (e) {
        console.log("Error" + e);
      }
    }
    reactive();

    return () => {
      cancleToken.cancel();
    };
  }, []);
  useEffect(() => {
    if (newComment) {
      const newCommentList = [newComment, ...commentList];
      setCommentList(newCommentList);
      const anchor = document.querySelector("#back-to-top-anchor");
      if (anchor) {
        anchor.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    }
  }, [newComment]);

  const fetchMoreData = () => {
    if (curPage === totalPages) {
      setHasMore(false);
      return;
    }

    const fetchApi = async () => {
      try {
        const response = await Api.get(
          `https://nanum.site/board-service/api/v1/board/reply/${boardId}?page=${curPage}&size=${defaultSize}`,
          ""
        );
        const { content } = response.data.result;
        console.log(" 목록 ", content);

        setCommentList((prev) => {
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
    <div className="comment_list_section">
      <ul>
        {commentList.length > 0 ? (
          <InfiniteScroll
            dataLength={commentList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<LastPageComment />}
          >
            {commentList &&
              commentList.map((comment, idx) => (
                <>
                  <CommentListItem
                    key={idx}
                    nickName={comment.nickName}
                    imgUrl={comment.imgUrl}
                    date={comment.createAt}
                    content={comment.content}
                    id={comment.replyId}
                    userId={comment.userId}
                    nestedCount={comment.nestedCount}
                    setInputCommnet={setInputCommnet}
                    inputCommnet={inputCommnet}
                    newReply={newReply}
                  />
                  <Divider />
                </>
              ))}
          </InfiniteScroll>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default CommentList;
