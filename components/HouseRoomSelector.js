import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";

import styles from "../styles/HouseRoomSelector.module.css";
import { Alert } from "@mui/material";

const HouseRoomSelector = ({
  roomData,
  tourForm,
  setTourForm,
  warnStatus,
  offWarning,
}) => {
  const [selectRoom, setSelectRoom] = useState("");

  useEffect(() => {
    setSelectRoom(tourForm.name);
  }, [tourForm]);

  const handleChange = (e, { props }) => {
    const { index } = props;
    setSelectRoom(e.target.value);

    if (e.target.value !== "") {
      setTourForm({
        ...tourForm,
        name: e.target.value,
        roomId: roomData[index].id,
        timeId: "",
      });
      offWarning();
    } else {
      setTourForm({
        ...tourForm,
        name: "",
        roomId: "",
        timeId: "",
      });
    }
  };

  return (
    <div className={styles.house_room_selector_wrapper}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">방선택</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectRoom}
          label="방선택"
          onChange={handleChange}
        >
          <MenuItem value="">선택</MenuItem>
          {roomData.map((room, index) => (
            <MenuItem key={room.id} value={room.name} index={index}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {warnStatus && (
        <Alert severity="error" sx={{ mt: 1 }}>
          방을 선택해주세요!
        </Alert>
      )}
    </div>
  );
};

export default HouseRoomSelector;
