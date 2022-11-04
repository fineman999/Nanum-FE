import { IconButton } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "../../styles/ReplyListItem.module.css";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import {
  displayedASpringMVC,
  displayedAt,
} from "../../lib/utils/useful-functions";
import { BoardImageProfileModal } from "../common/modal/BoardImageProfileModal";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import { confirmAlertV2, fireAlert } from "../common/Alert";
import { deleteReplyNest } from "../../lib/apis/board";
const ReplyListItem = ({
  content,
  date,
  profileImgUrl,
  nickName,
  replyId,
  userId,
  handleDeleteReplyNest,
  id,
}) => {
  const [userData, setUserData] = useRecoilState(userState);
  const handleDeleteReply = async () => {
    const result = await confirmAlertV2({
      icon: "warning",
      title: "댓글 삭제",
      text: "해당 댓글을 삭제하시겠습니까?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteReplyNest(id);
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
      await handleDeleteReplyNest(id);
    }
  };
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <div className={styles.name}>{nickName}</div>
              <div className={styles.comment_date}>{displayedAt(date)}</div>
            </div>
            <div style={{ marginRight: "1rem" }}>
              {userId === userData.id && nickName !== null ? (
                <IconButton onClick={handleDeleteReply}>
                  <RemoveIcon />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={styles.comment_content}>{content}</div>
      </div>
    </li>
  );
};

export default ReplyListItem;
