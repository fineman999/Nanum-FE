import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "../styles/NoticeListItem.module.css";
import classNames from "classnames/bind";
import Link from "next/link";
const cx = classNames.bind(styles);

const NoticeListItem = ({ id, date, title, viewCount, content, type }) => {
  return (
    // <Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}> Profile </Link>

    <Link href={`/community/board/${id}`}>
      <a style={{ color: "black" }}>
        <li>
          <div className={styles.article_wrapper}>
            <div className={styles.article_content}>
              <div style={{ width: "80%" }}>
                {new Intl.DateTimeFormat("ko", { dateStyle: "medium" }).format(
                  new Date(date)
                ) ===
                new Intl.DateTimeFormat("ko", { dateStyle: "medium" }).format(
                  Date.now()
                ) ? (
                  <div className={cx("article_header", "new")}>{title}</div>
                ) : (
                  <div className={styles.article_header}>{title}</div>
                )}
                {type ? (
                  <div className={styles.content_text}>{content}</div>
                ) : (
                  ""
                )}
              </div>
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
            <div className={styles.article_date}>
              <span className={styles.date_text}>
                {new Intl.DateTimeFormat("ko", { dateStyle: "medium" }).format(
                  new Date(date)
                )}
              </span>
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
};

export default NoticeListItem;
