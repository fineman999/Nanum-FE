import React from "react";
import ReplyListItem from "./ReplyListItem";

const ReplyList = () => {
  return (
    <div className="reply_list_wrapper">
      <ul>
        <ReplyListItem />
        <ReplyListItem />
        <ReplyListItem />
      </ul>
    </div>
  );
};

export default ReplyList;
