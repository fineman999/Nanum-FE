import React from "react";
import ReplyListItem from "./ReplyListItem";

const ReplyList = () => {
  return (
    <>
      <div className="reply_list_wrapper">
        <ul>
          <ReplyListItem />
          <ReplyListItem />
          <ReplyListItem />
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
