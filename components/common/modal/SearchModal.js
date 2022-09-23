import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import styled from "@emotion/styled";
import React from "react";

const SearchInput = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 0.8rem;
  line-height: 2.5;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SearchModal = ({ open, handleClose }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
            mb={3}
          >
            어떤 집에서 <br />
            살고 싶으세요?
          </Typography>
          <Box mb={5}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              어느 지역에서 살고 싶으세요?
            </Typography>
            <Paper>
              <SearchInput
                type="search"
                placeholder="지역명, 대학명, 지하철역으로 검색..."
              />
            </Paper>
          </Box>

          <Box mb={5}>
            <Typography mb={3} variant="subtitle1" sx={{ fontWeight: "bold" }}>
              누구랑 살고 싶으세요?
            </Typography>
            <Stack spacing={4}>
              <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    성별타입
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    autoWidth
                    label="성별타입"
                  >
                    <MenuItem value="c">남녀공용</MenuItem>
                    <MenuItem value="m">남성전용</MenuItem>
                    <MenuItem value="f">여성전용</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    주거형태
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    autoWidth
                    label="주거형태"
                  >
                    <MenuItem value={10}>빌라</MenuItem>
                    <MenuItem value={11}>아파트</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">룸형태</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="룸형태"
                    autoWidth
                  >
                    <MenuItem value={1}>1인실</MenuItem>
                    <MenuItem value={2}>2인실</MenuItem>
                    <MenuItem value={3}>3인실</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button>검색</Button>
            <Button onClick={handleClose}>닫기</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SearchModal;
