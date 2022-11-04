import React, { useState } from "react";

import HouseDateForm from "./HouseDateForm";
import HouseTimeList from "./HouseTimeList";

import styles from "../styles/HouseTourForm.module.css";
import { Button } from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import HouseRoomSelector from "./HouseRoomSelector";
import { post } from "../lib/apis/apiClient";

const HouseTourForm = ({ roomData, setTourForm, tourForm, toggleDrawer }) => {
  const [warnStatus, setWarnStatus] = useState(false);
  const [timeWarning, setTimeWarning] = useState(false);
  const onWarning = () => setWarnStatus(true);
  const offWarning = () => setWarnStatus(false);
  const onTimeWarning = () => setTimeWarning(true);
  const offTimeWarning = () => setTimeWarning(false);

  const handleTour = () => {
    if (!tourForm.roomId) {
      onWarning();
      console.log(tourForm);
      return null;
    } else if (!tourForm.timeId) {
      onTimeWarning();
      return null;
    }
    console.log(tourForm);

    const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;
    const API_URI = `/tours/houses/${tourForm.houseId}/rooms/${tourForm.roomId}`;
    const formData = {
      tourDate: tourForm.tourDate,
      timeId: tourForm.timeId,
      inquiry: "",
    };

    post(BASE_URL, API_URI, formData).then((res) => {
      console.log(res);
      const { data, status } = res;
      const { message } = data;
      switch (status) {
        case 201:
          alert(message);
          toggleDrawer(false)();
          break;
        case 208:
          alert(message);
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
