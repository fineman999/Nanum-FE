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
          console.log("getReplyList", getReplyList);
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
  useEffect(() => {
    if (newReply != undefined) {
      const newReplyList = [newReply, ...replyList];
      setReplyList(newReplyList);
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
