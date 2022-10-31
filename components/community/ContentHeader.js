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
import { fireAlert } from "../common/Alert";
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
    console.log("userData.id", userData.id, "userId", userId);
    console.log("boardId", boardId);
    console.log(...router.pathname.split("/"));
    router.push({
      pathname: `/community/category/${categoryId}/${boardId}/write`,
    });
  };
  const handleDelete = async () => {
    console.log("boardId", boardId);
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
          {createAt
            ? Intl.DateTimeFormat("ko", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(createAt))
            : ""}
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
          <span className={styles.icon_chats}>
            <ChatBubbleIcon
              style={{
                color: "rgba(0,0,0,0.2)",
                width: "18px",
                height: "18px",
              }}
            />
          </span>
          <span className={styles.icon_text}>20</span>
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
