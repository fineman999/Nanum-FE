import { TextareaAutosize } from "@mui/material";
import React from "react";

import styles from "../styles/MoveInquiryForm.module.css";

const MoveInquiryForm = ({ handleChange }) => {
  return (
    <div className={styles.move_inquiry_form}>
      <TextareaAutosize
        name="inquiry"
        placeholder="문의사항을 입력해주세요"
        style={{
          width: "100%",
          height: 300,
          border: "none",
          background: "#f5f5f5",
          borderRadius: "10px",
          boxSizing: "border-box",
          padding: "15px",
          fontSize: "1.5em",
          fontFamily: "Heebo, sans-serif",
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default MoveInquiryForm;
