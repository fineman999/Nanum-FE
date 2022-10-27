import { Avatar } from "@mui/material";
import React from "react";

import styles from "../../styles/ReplyListItem.module.css";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { displayedASpringMVC } from "../../lib/utils/useful-functions";
import { BoardImageProfileModal } from "../common/modal/BoardImageProfileModal";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
const ReplyListItem = ({
  content,
  date,
  profileImgUrl,
  nickName,
  replyId,
  userId,
}) => {
  const [userData, setUserData] = useRecoilState(userState);
  return (
    <li className={styles.reply_list_item}>
      <div className={styles.sub_ico_wrapper}>
        <SubdirectoryArrowRightIcon />
      </div>
      <div className={styles.reply_content_wrapper}>
        <div className={styles.comment_header}>
          <div className={styles.profie_image}>
            <BoardImageProfileModal
              alt={userId}
              img={profileImgUrl}
              name={nickName}
              size={3}
              type={userId === userData.id ? 3 : 2}
              left={`0.5rem`}
            />
          </div>
          <div className="comment_info">
            <div className={styles.name}>{nickName}</div>
            <div className={styles.comment_date}>
              {displayedASpringMVC(date)}
            </div>
          </div>
        </div>
        <div className="comment_content">{content}</div>
      </div>
    </li>
  );
};

export default ReplyListItem;
