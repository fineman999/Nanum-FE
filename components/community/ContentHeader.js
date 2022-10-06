import React from "react";
import { Avatar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "../../styles/ContentHeader.module.css";

const ContentHeader = () => {
  return (
    <div className={styles.content_header}>
      <Avatar
        alt="Remy Sharp"
        src="/images/default.png"
        sx={{ width: 96, height: 96, marginRight: "10px" }}
      />
      <div className={styles.content_info}>
        <h2 className="author">노숙자</h2>
        <span className={styles.article_date}>2022.10.06 11:28</span>
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

          <span className={styles.icon_text}>20</span>
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
