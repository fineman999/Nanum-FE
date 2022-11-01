import axios from "axios";
import React, { useEffect, useState } from "react";
import ReplyListItem from "./ReplyListItem";
import * as Api from "../../lib/apis/apiClient";
const ReplyList = ({ nestedCount, commentId, newReply }) => {
  const [replyList, setReplyList] = useState([]);
  useEffect(() => {
    const cancleToken = axios.CancelToken.source();
    async function reactive() {
      if (nestedCount > 0) {
        console.log("nestedCount", nestedCount);
        try {
          const getReplyList = await Api.getCancelToken(
            "https://nanum.site/board-service/api/v1/board/reply/nest/",
            commentId,
            cancleToken
          );
          if (!getReplyList) {
            throw new Error(`${getBoards} not allowd`);
          }
          setReplyList(getReplyList.data.result);
        } catch (e) {
          console.log("Error" + e);
        }
      }
    }
    reactive();
    return () => {
      cancleToken.cancel();
    };
  }, []);
  const handleDeleteReplyNest = async (id) => {
    setReplyList(
      replyList.map((reply) => {
        if (reply.id === id) {
          reply.imgUrl = "/images/default.png";
          reply.nickName = null;
          reply.content = "삭제된 댓글입니다";
        }
        return reply;
      })
    );
  };
  useEffect(() => {
    if (newReply != undefined && newReply.replyId === commentId) {
      // const newReplyList = [newReply, ...replyList];
      setReplyList((prev) => [...prev, newReply]);
      const anchor = document.querySelector("#back-to-top-anchor");
      if (anchor) {
        anchor.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    }
  }, [newReply]);
  return (
    <>
      <div className="reply_list_wrapper">
        <ul>
          {replyList &&
            replyList.map((reply, idx) => (
              <ReplyListItem
                key={idx}
                content={reply.content}
                date={reply.createAt}
                profileImgUrl={reply.imgUrl}
                nickName={reply.nickName}
                replyId={reply.replyId}
                userId={reply.userId}
                handleDeleteReplyNest={handleDeleteReplyNest}
                id={reply.id}
              />
            ))}
        </ul>
      </div>
      <style jsx>{`
        .reply_list_wrapper {
          background: #f5f5f5;
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default ReplyList;
