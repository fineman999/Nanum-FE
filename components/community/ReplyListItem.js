import { Avatar } from "@mui/material";
import React from "react";

import styles from "../../styles/ReplyListItem.module.css";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
const ReplyListItem = () => {
  return (
    <li className={styles.reply_list_item}>
      <div className={styles.sub_ico_wrapper}>
        <SubdirectoryArrowRightIcon />
      </div>
      <div className={styles.reply_content_wrapper}>
        <div className={styles.comment_header}>
          <div className={styles.profie_image}>
            <Avatar
              alt="프로필없음"
              src="/images/default.png"
              sx={{ width: 24, height: 24 }}
            />
          </div>
          <div className="comment_info">
            <div className={styles.name}>노숙자</div>
            <div className={styles.comment_date}>1일전</div>
          </div>
        </div>
        <div className="comment_content">
          Esse cupidatat pariatur deserunt adipisicing ea ad veniam.
        </div>
      </div>
    </li>
  );
};

export default ReplyListItem;
