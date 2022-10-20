import React, { useState } from "react";
import MoveProgressStepper from "./MoveProgressStepper";
import formatDate from "../lib/fomatDate";
import MoveDateForm from "./MoveDateForm";
import MoveInquiryForm from "./MoveInquiryForm";
import { Button } from "@mui/material";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
const MoveForm = () => {
  const [moveForm, setMoveForm] = useState({
    moveDate: "",
    inquiry: "",
  });

  const handleClickDate = (newValue) => {
    console.log(formatDate(newValue.toDate()));

    setMoveForm((prev) => {
      return {
        ...prev,
        moveDate: formatDate(newValue.toDate()),
      };
    });
  };

  const handleChange = (e) => {
    setMoveForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    console.log(moveForm);
  };

  return (
    <div className="move_form_wrapper">
      <MoveDateForm moveForm={moveForm} handleClickDate={handleClickDate} />
      <MoveInquiryForm handleChange={handleChange} />
      <Button
        variant="contained"
        startIcon={<DoorFrontIcon />}
        onClick={handleSubmit}
      >
        입주 신청
      </Button>
      <MoveProgressStepper />
    </div>
  );
};

export default MoveForm;
