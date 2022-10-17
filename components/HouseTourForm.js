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
        <Button
          color="primary"
          variant="contained"
          startIcon={<HowToRegIcon />}
          sx={{ color: "white", mr: 1 }}
        >
          투어신청
        </Button>
        <Button
          color="other"
          variant="contained"
          startIcon={<DoorFrontIcon />}
          sx={{ color: "white" }}
        >
          입주신청
        </Button>
      </div>
    </>
  );
};

export default HouseTourForm;
