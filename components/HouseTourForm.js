import React, { useState } from "react";

import HouseDateForm from "./HouseDateForm";
import HouseTimeList from "./HouseTimeList";

import styles from "../styles/HouseTourForm.module.css";
import { Button } from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import HouseRoomSelector from "./HouseRoomSelector";
import { post } from "../lib/apis/apiClient";
import { fireAlert } from "./common/Alert";
import { authState } from "../state/atom/authState";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const HouseTourForm = ({ roomData, setTourForm, tourForm, toggleDrawer }) => {
  const authValue = useRecoilValue(authState);
  const [warnStatus, setWarnStatus] = useState(false);
  const [timeWarning, setTimeWarning] = useState(false);
  const [dateWarning, setDateWarning] = useState(false);

  const onWarning = () => setWarnStatus(true);
  const offWarning = () => setWarnStatus(false);
  const onTimeWarning = () => setTimeWarning(true);
  const offTimeWarning = () => setTimeWarning(false);
  const onDateWarning = () => setDateWarning(true);
  const offDateWarning = () => setDateWarning(false);

  const router = useRouter();

  const handleTour = () => {
    if (!tourForm.roomId) {
      onWarning();
      return null;
    } else if (!tourForm.timeId) {
      onTimeWarning();
      return null;
    }

    // 비회원인 경우 로그인 페이지로 라우팅시킨다.
    if (!authValue.isLogin) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "로그인 페이지로<br/>이동하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니오",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return null;
    }

    const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;
    const API_URI = `/tours/houses/${tourForm.houseId}/rooms/${tourForm.roomId}`;
    const formData = {
      tourDate: tourForm.tourDate,
      timeId: tourForm.timeId,
      inquiry: "",
    };

    // console.log(formData);
    post(BASE_URL, API_URI, formData).then((res) => {
      const { data, status } = res;
      const { message } = data;
      switch (status) {
        case 201:
          toggleDrawer(false)();
          fireAlert({ icon: "success", title: message });
          break;
        case 208:
          fireAlert({ icon: "warning", title: message });
          break;
      }
    });
  };

  return (
    <>
      <HouseRoomSelector
        roomData={roomData}
        tourForm={tourForm}
        setTourForm={setTourForm}
        warnStatus={warnStatus}
        offWarning={offWarning}
      />
      <HouseDateForm
        tourForm={tourForm}
        setTourForm={setTourForm}
        onWarning={onWarning}
        offWarning={offWarning}
        dateWarning={dateWarning}
        onDateWarning={onDateWarning}
        offDateWarning={offDateWarning}
      />
      <HouseTimeList
        tourForm={tourForm}
        setTourForm={setTourForm}
        timeWarning={timeWarning}
        offTimeWarning={offTimeWarning}
      />
      <div className={styles.form_btns}>
        <Button
          variant="contained"
          startIcon={<HowToRegIcon />}
          onClick={handleTour}
        >
          투어신청
        </Button>
      </div>
    </>
  );
};

export default HouseTourForm;
