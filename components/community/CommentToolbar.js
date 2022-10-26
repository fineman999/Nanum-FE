import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styles from "../../styles/CommentToolbar.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import * as Api from "../../lib/apis/apiClient";

const CommentToolbar = ({ boardId }) => {
  const [form, setForm] = useState("");

  // const userData = useRecoilState(userSt);
  const handleChange = (e) => {
    setForm(e.target.value);
  };
  const handleSend = () => {
    console.log(form);
    console.log(boardId[0]);

    Api.post("https://nanum.site/board-service/api/v1/board/reply/");
  };
  return (
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
  );
};

export default CommentToolbar;
