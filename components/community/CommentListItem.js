import { Avatar } from "@mui/material";
import React from "react";

import styles from "../../styles/CommentListItem.module.css";
import ReplyList from "./ReplyList";

const CommentListItem = () => {
  return (
    <li
      className={styles.comment_list_item}
      onMouseOver={() => console.log("댓글 달기")}
    >
      <div className={styles.comment_wrapper}>
        <div className={styles.comment_header}>
          <div className={styles.profie_image}>
            <Avatar
              alt="프로필없음"
              src="/images/default.png"
              sx={{ width: 36, height: 36 }}
            />
          </div>
          <div className="comment_info">
            <div className={styles.name}>노숙자</div>
            <div className={styles.comment_date}>1일전</div>
          </div>
        </div>
        <div className={styles.comment_content}>
          Esse cupidatat pariatur deserunt adipisicing ea ad veniam.
        </div>
      </div>
      {/* 대댓글 */}
      <ReplyList />
    </li>
  );
};

export default CommentListItem;
