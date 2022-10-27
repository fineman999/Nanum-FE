import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { displayedASpringMVC } from "../../lib/utils/useful-functions";
import { userState } from "../../state/atom/authState";
import AddCommentIcon from "@mui/icons-material/AddComment";
import styles from "../../styles/CommentListItem.module.css";
import { BoardImageProfileModal } from "../common/modal/BoardImageProfileModal";
import ReplyList from "./ReplyList";

const CommentListItem = ({
  nickName,
  imgUrl,
  date,
  content,
  id,
  userId,
  nestedCount,
  inputCommnet,
  setInputCommnet,
  newReply,
}) => {
  const [userData, setUserData] = useRecoilState(userState);

  const sendReply = () => {
    setInputCommnet((current) => {
      let newCondition = { ...current };
      newCondition.open = true;
      newCondition.commentId = id;
      newCondition.replyName = nickName;
      return newCondition;
    });
  };
  return (
    <li className={styles.comment_list_item}>
      <div className={styles.comment_wrapper}>
        <div
          className={styles.comment_header}
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <div style={{ display: "flex" }}>
            <div className={styles.profie_image}>
              <BoardImageProfileModal
                alt={userId}
                img={imgUrl}
                name={nickName}
                size={4}
                type={userId === userData.id ? 3 : 2}
              />
            </div>
            <div className="comment_info">
              <div className={styles.name}>{nickName}</div>
              <div className={styles.comment_date}>
                {displayedASpringMVC(date)}
              </div>
            </div>
          </div>
          <div>
            <IconButton onClick={sendReply}>
              <AddCommentIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.comment_content}>{content}</div>
      </div>
      {/* 대댓글 */}
      {nestedCount > 0 ? (
        <ReplyList
          nestedCount={nestedCount}
          commentId={id}
          newReply={newReply}
        />
      ) : (
        ""
      )}
    </li>
  );
};

export default CommentListItem;
