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
import React, { useState } from "react";
import SearchAreaRadioGroup from "../../SearchAreaList";
import { fireAlert } from "../Alert";
import { useRouter } from "next/router";

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
  p: 3,
};

const SearchModal = ({ open, handleClose }) => {
  const router = useRouter();
  const [detailSearchForm, setDetailSearchForm] = useState({
    searchWord: "", // 검색 키워드
    searchArea: "전국", // 지역 검색
    genderType: "", // 성별타입 검색
    houseType: "", // 하우스 타입 검색
  });

  const handleChange = (e) => {
    setDetailSearchForm({
      ...detailSearchForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if (detailSearchForm.searchWord === "") {
      fireAlert({ icon: "warning", title: "검색어를 입력해주세요." });
      return null;
    }
    router.push({
      pathname: "/house",
      query: {
        ...detailSearchForm,
      },
    });
    handleClose();
  };

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
            mb={1}
          >
            어떤 집에서 <br />
            살고 싶으세요?
          </Typography>
          <Box mb={2}>
            <Paper>
              <SearchInput
                name="searchWord"
                type="search"
                placeholder="지역명, 대학명, 지하철역으로 검색..."
                onChange={handleChange}
                autoComplete="off"
              />
            </Paper>
          </Box>
          {/* 지역별 검색 키워드 */}
          <SearchAreaRadioGroup handleChange={handleChange} />

          <Box mb={2}>
            <Stack spacing={1}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    성별타입
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    autoWidth
                    label="성별타입"
                    value={detailSearchForm.genderType || ""}
                    name="genderType"
                    onChange={handleChange}
                  >
                    <MenuItem value="COMMON">남녀공용</MenuItem>
                    <MenuItem value="MALE">남성전용</MenuItem>
                    <MenuItem value="FEMALE">여성전용</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    주거형태
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    autoWidth
                    label="주거형태"
                    value={detailSearchForm.houseType || ""}
                    name="houseType"
                    onChange={handleChange}
                  >
                    <MenuItem value="원룸형">원룸형</MenuItem>
                    <MenuItem value="빌라">빌라형</MenuItem>
                    <MenuItem value="아파트형">아파트형</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button onClick={handleSearch}>검색</Button>
            <Button onClick={handleClose}>닫기</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SearchModal;
