import React from "react";

import styles from "../styles/BoardSearchFilter.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const BoardSearchFilter = ({ category, setCategory, board, setBoard }) => {
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeBoard = (event) => {
    setBoard(event.target.value);
  };
  return (
    <div className="board_serach_filter_wrapper">
      <ul className={styles.board_serach_filter}>
        <Box sx={{ minWidth: 120, bottom: "28px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="category"
              onChange={handleChangeCategory}
              sx={{ height: "3rem" }}
            >
              <MenuItem value={0}>전체</MenuItem>
              <MenuItem value={1}>공지</MenuItem>
              <MenuItem value={2}>자유</MenuItem>
              <MenuItem value={3}>정보</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, bottom: "28px", marginLeft: "0.5rem" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">종류</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={board}
              label="board"
              onChange={handleChangeBoard}
              sx={{ height: "3rem" }}
            >
              <MenuItem value={0}>전체</MenuItem>
              <MenuItem value={1}>제목</MenuItem>
              <MenuItem value={2}>내용</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </ul>
    </div>
  );
};

export default BoardSearchFilter;
