import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../../styles/CommentToolbar.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import * as Api from "../../lib/apis/apiClient";
import { userState } from "../../state/atom/authState";
import CloseIcon from "@mui/icons-material/Close";
const CommentToolbar = ({
  boardId,
  setNewComment,
  newComment,
  setInputCommnet,
  inputCommnet,
  setNewReply,
}) => {
  const [form, setForm] = useState("");
  const [userData, setUserData] = useRecoilState(userState);
  // const userData = useRecoilState(userSt);
  const handleChange = (e) => {
    setForm(e.target.value);
  };
  const handleClose = () => {
    // setInputCommnet((current) => {
    //   let newCondition = { ...current };
    //   newCondition.open = false;
    //   newCondition.commentId = 0;
    //   newCondition.replyName = "";
    //   return newCondition;
    // });
    setInputCommnet({
      open: false,
      commentId: 0,
      replyName: "",
    });
  };
  const handleReplySend = async () => {
    const data = {
      replyId: inputCommnet.commentId,
      userId: userData.id,
      content: form,
    };
    try {
      const sendReply = await Api.post(
        "https://nanum.site/board-service/api/v1/board/reply/nest",
        "",
        data
      );
      if (!sendReply) {
        throw new Error(`${getBoards} not allowd`);
      }
      setForm("");
      setInputCommnet((current) => {
        let newCondition = { ...current };
        newCondition.open = false;
        newCondition.commentId = 0;
        newCondition.replyName = "";
        return newCondition;
      });
      setNewReply(sendReply.data.result);
      // setNewComment(sendReply.data.result);
    } catch (e) {
      console.log("Error" + e);
    }
  };
  const handleSend = async () => {
    const data = {
      boardId: boardId[0],
      content: form,
    };
    try {
      const sendComment = await Api.post(
        "https://nanum.site/board-service/api/v1/board/reply/",
        userData.id,
        data
      );
      if (!sendComment) {
        throw new Error(`${getBoards} not allowd`);
      }
      setForm("");
      setNewComment(sendComment.data.result);
    } catch (e) {
      console.log("Error" + e);
    }
  };
  return (
    <>
      {inputCommnet.open ? (
        <>
          <div className={styles.reply_toolbar_wrapper}>
            <div className={styles.reply_inp_wrapper}>
              <div className={styles.reply_member}>
                <div>{inputCommnet.replyName}</div>
                <div
                  style={{
                    fontSize: "0.4rem",
                    marginTop: "0.3rem",
                    color: "gray",
                  }}
                >
                  님에게
                </div>
              </div>

              <div className={styles.comment_inp_btn}>
                <Button variant="outlined" onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.comment_toolbar_wrapper}>
            <div className={styles.comment_inp_wrapper}>
              <input
                className={styles.comment_input}
                type="text"
                placeholder="대댓글..."
                value={form}
                onChange={handleChange}
              />
              <div className={styles.comment_inp_btn}>
                <Button variant="outlined" onClick={handleReplySend}>
                  <SendIcon />
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.comment_toolbar_wrapper}>
          <div className={styles.comment_inp_wrapper}>
            <input
              className={styles.comment_input}
              type="text"
              placeholder="댓글..."
              value={form}
              onChange={handleChange}
            />
            <div className={styles.comment_inp_btn}>
              <Button variant="outlined" onClick={handleSend}>
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentToolbar;
