import React from "react";
import { Avatar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "../../styles/ContentHeader.module.css";
import { ProfileImg } from "../common/Profile";
import { BoardImageProfileModal } from "../common/modal/BoardImageProfileModal";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";

const ContentHeader = ({
  boardId,
  boardUserId,
  nickName,
  createAt,
  viewCount,
  profileImgUrl,
}) => {
  const userData = useRecoilState(userState);
  return (
    <div className={styles.content_header}>
      <BoardImageProfileModal
        img={profileImgUrl}
        name={nickName}
        id={boardUserId}
        size={8}
        type={boardUserId === userData[0].id ? 3 : 2}
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
    </div>
  );
};

export default ContentHeader;
