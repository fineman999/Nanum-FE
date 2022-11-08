import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get } from "../lib/apis/apiClient";

import styles from "../styles/HouseTimeList.module.css";
import HouseTimeListItem from "./HouseTimeListItem";

const HouseTimeList = ({
  tourForm,
  setTourForm,
  timeWarning,
  offTimeWarning,
}) => {
  const [timeList, setTimeList] = useState([]);
  const handleClick = (time) => {
    const nextTime = time.timeId;
    setTourForm({
      ...tourForm,
      timeId: nextTime,
    });
    offTimeWarning();
  };

  useEffect(() => {
    if (tourForm.houseId !== "" && tourForm.roomId !== "") {
      const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;
      const API_URI = `/tours/houses/${tourForm.houseId}/room/${tourForm.roomId}/date/${tourForm.tourDate}`;
      console.log("시간대 조회: ", BASE_URL + API_URI);

      get(BASE_URL, API_URI)
        .then((res) => {
          const { status } = res;
          const { isSuccess, message, result } = res.data;
          if (status === 200 && isSuccess) {
            setTimeList(result);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [tourForm]);

  if (tourForm.roomId === "") {
    return null;
  }

  return (
    <div className={styles.house_date_list_wrapper}>
      <ul className={styles.date_list}>
        {timeList &&
          timeList.map((time) => (
            <HouseTimeListItem
              key={time.timeId}
              time={time}
              handleClick={handleClick}
            />
          ))}
      </ul>
      {timeWarning && (
        <Alert severity="warning" sx={{ mt: 1 }}>
          시간대를 선택해주세요. <br />
          (당일 예약은 불가능합니다.)
        </Alert>
      )}
    </div>
  );
};

export default HouseTimeList;
