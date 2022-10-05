import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "../styles/NoticeCategory.module.css";

const NoticeCategory = () => {
  return (
    <div className={styles.category_container}>
      <div className="category_header">
        <h2>공지사항</h2>
        <ul>
          <li>
            <div className={styles.article_wrapper}>
              <div className="title">공지사항입니다.</div>
              <div className="icons">
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NoticeCategory;
