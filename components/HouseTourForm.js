import React from "react";

import HouseDateForm from "./HouseDateForm";
import HouseTimeList from "./HouseTimeList";

import styles from "../styles/HouseTourForm.module.css";
import { Button } from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
const HouseTourForm = () => {
  return (
    <>
      <HouseDateForm />
      <HouseTimeList />
      <div className={styles.form_btns}>
        <Button variant="contained" startIcon={<HowToRegIcon />} sx={{ mr: 1 }}>
          투어신청
        </Button>
        <Button variant="contained" startIcon={<DoorFrontIcon />}>
          입주신청
        </Button>
      </div>
    </>
  );
};

export default HouseTourForm;
