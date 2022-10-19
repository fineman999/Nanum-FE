import React, { useEffect, useState } from "react";

import HouseDateForm from "./HouseDateForm";
import HouseTimeList from "./HouseTimeList";

import styles from "../styles/HouseTourForm.module.css";
import { Button } from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import HouseRoomSelector from "./HouseRoomSelector";
import { fireAlert } from "./common/Alert";
import { post } from "../lib/apis/apiClient";

const HouseTourForm = ({ roomData, setTourForm, tourForm, toggleDrawer }) => {
  const [timeList, setTimeList] = useState([]);
  const handleTour = () => {
    const message = "";
    const status = "";
    if (!tourForm.roomId) {
      // fireAlert({ icon: "warning", title: "방을 선택해주세요!!" });
      alert("방을 선택해주세요!!");
      console.log(tourForm);

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

    post(BASE_URL, API_URI, formData).then((res) => console.log(res));
    toggleDrawer(false)();
  };

  return (
    <>
      <HouseRoomSelector
        roomData={roomData}
        tourForm={tourForm}
        setTourForm={setTourForm}
      />
      <HouseDateForm tourForm={tourForm} setTourForm={setTourForm} />
      <HouseTimeList tourForm={tourForm} setTourForm={setTourForm} />
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
