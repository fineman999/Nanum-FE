import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "../styles/NoticeListItem.module.css";
import classNames from "classnames/bind";
import Link from "next/link";
const cx = classNames.bind(styles);

const NoticeListItem = () => {
  return (
    <Link href="/community/board/1">
      <a style={{ color: "black" }}>
        <li>
          <div className={styles.article_wrapper}>
            <div className={styles.article_content}>
              <div className={cx("article_header", "new")}>공지사항입니다.</div>
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
            <div className={styles.article_date}>
              <span className={styles.date_text}>2022/10/06</span>
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
};

export default NoticeListItem;
