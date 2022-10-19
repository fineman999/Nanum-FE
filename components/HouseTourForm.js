import React from "react";

import HouseDateForm from "./HouseDateForm";
import HouseTimeList from "./HouseTimeList";

import styles from "../styles/HouseTourForm.module.css";
import { Button } from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
const HouseTourForm = () => {
  return (
    <>
      <HouseDateForm />
      <HouseTimeList />
      <div className={styles.form_btns}>
        <Button variant="contained" startIcon={<HowToRegIcon />}>
          투어신청
        </Button>
      </div>
    </>
  );
};

export default HouseTourForm;
