import React, { useState } from "react";
import formatDate from "../lib/fomatDate";
import MoveDateForm from "./MoveDateForm";
import MoveInquiryForm from "./MoveInquiryForm";
import { Button, Divider } from "@mui/material";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import { useRouter } from "next/router";
import { post } from "../lib/apis/apiClient";
import { fireAlert } from "./common/Alert";
import styles from "../styles/MoveForm.module.css";
import Swal from "sweetalert2";
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

  const handleSubmit = () => {
    Swal.fire({
      title: "입주 신청을<br/>하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (moveForm.moveDate === "") {
          fireAlert({ icon: "warning", title: "입주 날짜를 선택해주세요." });
          return null;
        }

        // 입주 신청 API 요청
        const { houseId, roomId } = router.query;
        console.log(moveForm);
        const API_URI = `/move-in/houses/${houseId}/rooms/${roomId}`;
        const formData = {
          moveDate: moveForm.moveDate,
          inquiry: moveForm.inquiry,
        };
        post(BASE_URL, API_URI, formData).then((res) => {
          console.log(res);
          const { status } = res;
          const { isSuccess, message, result } = res.data;
          if (isSuccess) {
            fireAlert({ icon: "success", title: result });
            router.push("/mypage");
          }

          if (status === 208) {
            const { message } = res.data;
            fireAlert({ icon: "warning", title: message });
          }
        });
      }
    });
  };

  return (
    <div className={styles.move_form_wrapper}>
      <div className={styles.move_date}>
        <h3 className={styles.section_title}>입주 날짜</h3>
        <MoveDateForm moveForm={moveForm} handleClickDate={handleClickDate} />
      </div>
      <Divider />
      <div className={styles.inquiry_section}>
        <h3 className={styles.section_title}>문의사항</h3>
        <MoveInquiryForm handleChange={handleChange} />
      </div>

      <div className={styles.move_btns}>
        <Button
          variant="contained"
          startIcon={<DoorFrontIcon />}
          onClick={handleSubmit}
        >
          입주 신청
        </Button>
      </div>
    </div>
  );
};

export default MoveForm;
