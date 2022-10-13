import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import styles from "../styles/HostHouseOptions.module.css";

const HostHouseOptions = ({ houseOption, handleOption }) => {
  const [options, setOptions] = useState([
    {
      id: 1,
      value: 1, // houseOptionId
      name: "옵션1", //OptionName
      isChecked: false,
      iconPath: "",
    },
    {
      id: 2, // 프론트
      value: 2, // 서버
      name: "옵션2",
      isChecked: false,
      iconPath: "",
    },
    {
      id: 3,
      value: 3,
      name: "옵션3",
      isChecked: false,
      iconPath: "",
    },
    {
      id: 4,
      value: 4,
      name: "옵션4",
      isChecked: false,
      iconPath: "",
    },
    {
      id: 5,
      value: 5,
      name: "옵션5",
      isChecked: false,
      iconPath: "",
    },
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // 등록 : 옵션을 선택한다. → 관리자가 선택한 옵션(options)
    // 수정 : 서버로부터 옵션 값을 받아와서 표시한다. → 선택된 옵션(selectedOptions)
  }, []);

  // 옵션 클릭 이벤트 핸들러
  const handleClick = (option, index) => {
    // 옵션 항목 상태 변경
    const nextOptions = [
      ...options.slice(0, index),
      { ...option, isChecked: !option.isChecked },
      ...options.slice(index + 1),
    ];
    setOptions(nextOptions);

    let idx = selectedOptions.indexOf(option.id);
    let nextSelectedOptions = [];
    if (idx === -1) {
      // 새로운 옵션 추가
      nextSelectedOptions = [...selectedOptions, option.id];
    } else {
      nextSelectedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option.id
      );
    }
    setSelectedOptions([...nextSelectedOptions]);
    handleOption(nextSelectedOptions); // 요청 폼 옵션 리스트를 갱신한다.
  };

  return (
    <div className={styles.host_house_options_wrapper}>
      {options &&
        options.map((option, index) => (
          <Chip
            key={option.id}
            color={option.isChecked ? "primary" : "default"}
            label={option.name}
            name="houseOption"
            variant="outlined"
            deleteIcon={<DoneIcon />}
            onDelete={() => handleClick(option, index)}
            onClick={() => handleClick(option, index)}
            sx={{ cursor: "pointer" }}
          />
        ))}
    </div>
  );
};

export default HostHouseOptions;
