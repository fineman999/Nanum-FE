import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get } from "../lib/apis/apiClient";

import styles from "../styles/HouseDateList.module.css";

const HouseTimeList = ({ tourForm, setTourForm }) => {
  const [timeList, setTimeList] = useState([]);
  const handleClick = (time) => {
    const nextTimeList = timeList.map((v) =>
      v.timeId === time.timeId ? { ...v, isAvailable: !v.isAvailable } : v
    );

    const nextTime = time.timeId;
    setTourForm({
      ...tourForm,
      timeId: nextTime,
    });
  };

  useEffect(() => {
    if (tourForm.tourDate !== "") {
      const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;
      const API_URI = `/tours/houses/${tourForm.houseId}/room/${tourForm.roomId}/date/${tourForm.tourDate}`;
      console.log(BASE_URL + API_URI);

      get(BASE_URL, API_URI)
        .then((res) => res.data)
        .then((data) => setTimeList([...data.result]))
        .catch((err) => console.log(err));
    }
  }, [tourForm.tourDate]);

  return (
    <div className={styles.house_date_list_wrapper}>
      <ul className={styles.date_list}>
        {timeList &&
          timeList.map((time) => (
            <li key={time.timeId}>
              {time.isAvailable ? (
                <Chip
                  label={time.time}
                  variant="outlined"
                  onClick={() => handleClick(time)}
                />
              ) : (
                <Chip label={time.time} />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HouseTimeList;
