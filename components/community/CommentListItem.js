import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  displayedASpringMVC,
  displayedAt,
} from "../../lib/utils/useful-functions";
import { userState } from "../../state/atom/authState";
import AddCommentIcon from "@mui/icons-material/AddComment";
import styles from "../../styles/CommentListItem.module.css";
import { BoardImageProfileModal } from "../common/modal/BoardImageProfileModal";
import ReplyList from "./ReplyList";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteReply } from "../../lib/apis/board";
import { confirmAlertV2, fireAlert } from "../common/Alert";
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
  handleDeleteReply,
}) => {
  const [userData, setUserData] = useRecoilState(userState);
  const sendDeleteReply = async () => {
    const result = await confirmAlertV2({
      icon: "warning",
      title: "댓글 삭제",
      text: "해당 댓글을 삭제하시겠습니까?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteReply(id);
        if (result.status === 200) {
          fireAlert({
            icon: "success",
            title: "성공적으로 댓글을 삭제하였습니다.",
          });
        } else {
          fireAlert({
            icon: "error",
            title: "댓글 삭제를 실패했습니다.",
          });
        }
        return true;
      }
      return false;
    });
    if (result) {
      await handleDeleteReply(id);
    }
  };
  const sendReply = () => {
    // setInputCommnet((current) => {
    //   let newCondition = { ...current };
    //   newCondition.open = true;
    //   newCondition.commentId = id;
    //   newCondition.replyName = nickName;
    //   return newCondition;
    // });
    setInputCommnet({
      open: true,
      commentId: id,
      replyName: nickName,
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
                id={userId}
                size={4}
                type={userId === userData.id ? 3 : 2}
              />
            </div>
            <div className="comment_info">
              <div className={styles.name}>{nickName}</div>
              <div className={styles.comment_date}>{displayedAt(date)}</div>
            </div>
          </div>
          <div className={styles.supplementary_wrapper}>
            {userId === userData.id && nickName !== null ? (
              <IconButton sx={{ bottom: " 0.1rem" }} onClick={sendDeleteReply}>
                <DeleteIcon />
              </IconButton>
            ) : (
              ""
            )}
            {nickName !== null ? (
              <IconButton onClick={sendReply}>
                <AddCommentIcon />
              </IconButton>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.comment_content}>{content}</div>
      </div>
      <ReplyList
        nestedCount={nestedCount}
        commentId={id}
        newReply={newReply}
        inputCommnet={inputCommnet}
      />
    </li>
  );
};

export default CommentListItem;
