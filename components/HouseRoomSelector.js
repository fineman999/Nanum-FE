import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";

import styles from "../styles/HouseRoomSelector.module.css";

const HouseRoomSelector = ({ roomData, tourForm, setTourForm }) => {
  const [selectRoom, setSelectRoom] = useState("");

  const handleChange = (e, { props }) => {
    const { index } = props;
    setSelectRoom(e.target.value);

    if (e.target.value !== "") {
      setTourForm({
        ...tourForm,
        roomId: roomData[index].id,
      });
    } else {
      setTourForm({
        ...tourForm,
        roomId: "",
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
    </div>
  );
};

export default HouseRoomSelector;
