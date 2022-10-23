import { TextareaAutosize } from "@mui/material";
import React from "react";

const MoveInquiryForm = ({ handleChange }) => {
  return (
    <div>
      <TextareaAutosize
        name="inquiry"
        placeholder="문의사항을 입력해주세요"
        onChange={handleChange}
      />
    </div>
  );
};

export default MoveInquiryForm;
