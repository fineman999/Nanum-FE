import { Chip } from "@mui/material";
import React from "react";

import styles from "../styles/HouseDateList.module.css";

const timeList = [
  {
    timeId: 1,
    time: "09:00:00",
    isAvailable: true,
  },
  {
    timeId: 2,
    time: "09:30:00",
    isAvailable: true,
  },
  {
    timeId: 3,
    time: "10:00:00",
    isAvailable: false,
  },
  {
    timeId: 4,
    time: "10:30:00",
    isAvailable: false,
  },
  {
    timeId: 5,
    time: "11:00:00",
    isAvailable: false,
  },
  {
    timeId: 6,
    time: "11:30:00",
    isAvailable: true,
  },
  {
    timeId: 7,
    time: "12:00:00",
    isAvailable: true,
  },
  {
    timeId: 8,
    time: "12:30:00",
    isAvailable: true,
  },
  {
    timeId: 9,
    time: "13:00:00",
    isAvailable: true,
  },
  {
    timeId: 10,
    time: "13:30:00",
    isAvailable: true,
  },
  {
    timeId: 11,
    time: "14:00:00",
    isAvailable: true,
  },
  {
    timeId: 12,
    time: "14:30:00",
    isAvailable: true,
  },
  {
    timeId: 13,
    time: "15:00:00",
    isAvailable: true,
  },
  {
    timeId: 14,
    time: "15:30:00",
    isAvailable: true,
  },
  {
    timeId: 15,
    time: "16:00:00",
    isAvailable: true,
  },
  {
    timeId: 16,
    time: "16:30:00",
    isAvailable: true,
  },
  {
    timeId: 17,
    time: "17:00:00",
    isAvailable: true,
  },
  {
    timeId: 18,
    time: "17:30:00",
    isAvailable: true,
  },
  {
    timeId: 19,
    time: "18:00:00",
    isAvailable: true,
  },
];

const HouseTimeList = () => {
  const handleClick = (time) => {
    alert(time.time + " 예약 되었습니다.");
  };

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
