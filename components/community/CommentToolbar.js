import React from "react";

import styles from "../../styles/CommentToolbar.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

const CommentToolbar = () => {
  return (
    <div className={styles.comment_toolbar_wrapper}>
      <div className={styles.comment_inp_wrapper}>
        <input type={styles.comment_input} placeholder="댓글..." />
        <div className={styles.comment_inp_btn}>
          <Button variant="outlined">
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentToolbar;
