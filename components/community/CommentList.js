import { Divider } from "@mui/material";
import React from "react";

import CommentListItem from "../community/CommentListItem";

const CommentList = () => {
  return (
    <div className="comment_list_section">
      <ul>
        <CommentListItem />
        <Divider />
        <CommentListItem />
        <Divider />
        <CommentListItem />
      </ul>
    </div>
  );
};

export default CommentList;
