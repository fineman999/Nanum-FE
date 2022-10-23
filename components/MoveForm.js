import React, { useState } from "react";
import MoveProgressStepper from "./MoveProgressStepper";
import formatDate from "../lib/fomatDate";
import MoveDateForm from "./MoveDateForm";
import MoveInquiryForm from "./MoveInquiryForm";
import { Button } from "@mui/material";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import { useRouter } from "next/router";
import { post } from "../lib/apis/apiClient";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const MoveForm = () => {
  const router = useRouter();
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
    console.log(router);

    if (moveForm.moveDate === "" || moveForm.inquiry === "") return null;
    const { houseId, roomId } = router.query;
    console.log(moveForm);
    const API_URI = `/move-in/houses/${houseId}/rooms/${roomId}`;
    const formData = {
      moveDate: moveForm.moveDate,
      inquiry: moveForm.inquiry,
    };
    post(BASE_URL, API_URI, formData).then((res) => console.log(res));
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
