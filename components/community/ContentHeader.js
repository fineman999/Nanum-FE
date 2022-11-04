import React, { useState } from "react";
import { Avatar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "../../styles/ContentHeader.module.css";
import { ProfileImg } from "../common/Profile";
import { BoardImageProfileModal } from "../common/modal/BoardImageProfileModal";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { deleteBoard } from "../../lib/apis/board";
import { confirmAlert, confirmAlertV2, fireAlert } from "../common/Alert";
import { displayedAtV2 } from "../../lib/utils/useful-functions";
const ContentHeader = ({
  boardId,
  boardUserId,
  nickName,
  createAt,
  viewCount,
  profileImgUrl,
  userId,
  categoryId,
}) => {
  const [userData, setUserData] = useRecoilState(userState);
  const router = useRouter();

  const handleFix = () => {
    router.push({
      pathname: `/community/category/${categoryId}/${boardId}/write`,
    });
  };
  const handleDelete = async () => {
    confirmAlertV2({
      icon: "warning",
      title: "게시판 삭제",
      text: "해당 게시판을 삭제하시겠습니까?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteBoard(boardId);
        if (result.status === 200) {
          fireAlert({
            icon: "success",
            title: "성공적으로 게시글을 삭제하였습니다.",
          });
          router.back();
        } else {
          fireAlert({
            icon: "error",
            title: "게시글 삭제를 실패했습니다.",
          });
        }
        return true;
      }
      return false;
    });
  };
  return (
    <div className={styles.content_header}>
      <BoardImageProfileModal
        img={profileImgUrl}
        name={nickName}
        id={boardUserId}
        size={8}
        type={boardUserId === userData.id ? 3 : 2}
      />
      <div className={styles.content_info}>
        <h2 className="author">{nickName}</h2>
        <span className={styles.article_date}>
          {createAt ? displayedAtV2(createAt) : ""}
        </span>
        <div className={styles.icons}>
          <span className={styles.icon_views}>
            <VisibilityIcon
              style={{
                color: "rgba(0,0,0,0.2)",
                width: "18px",
                height: "18px",
              }}
            />
          </span>
          <span className={styles.icon_text}>{viewCount}</span>
          {/* <span className={styles.icon_chats}>
            <ChatBubbleIcon
              style={{
                color: "rgba(0,0,0,0.2)",
                width: "18px",
                height: "18px",
              }}
            />
          </span>
          <span className={styles.icon_text}>20</span> */}
        </div>
      </div>
      {userData.id + "" === userId + "" ? (
        <div className={styles.user_incorrect_container}>
          <button className={styles.user_incorrect_fix} onClick={handleFix}>
            수정
          </button>
          <button
            className={styles.user_incorrect_delete}
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContentHeader;
