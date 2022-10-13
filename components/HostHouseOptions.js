import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import styles from "../styles/HostHouseOptions.module.css";

const tempOptions = [
  {
    houseOptionId: 1,
    optionName: "냉장고",
    isChecked: false,
    iconPath: "test",
  },
  {
    houseOptionId: 2,
    optionName: "TV",
    isChecked: false,
    iconPath: "test",
  },
  {
    houseOptionId: 3,
    optionName: "공용 화장실",
    isChecked: false,
    iconPath: "test",
  },
  {
    houseOptionId: 4,
    optionName: "테라스",
    isChecked: false,
    iconPath: "test",
  },
  {
    houseOptionId: 5,
    optionName: "에어컨",
    isChecked: false,
    iconPath: "test",
  },
];

const HostHouseOptions = ({ houseOption = [], handleOption }) => {
  const [options, setOptions] = useState(tempOptions);

  useEffect(() => {
    // 등록 : 옵션을 선택한다. → 관리자가 선택한 옵션(options)
    // 수정 : 서버로부터 옵션 값을 받아와서 표시한다. → 선택된 옵션(selectedOptions)
    if (houseOption.length > 0) {
      setOptions(houseOption);
    }
  }, [houseOption]);

  // 옵션 클릭 이벤트 핸들러
  const handleClick = (option, index) => {
    // 옵션 항목 상태 변경
    const nextOptions = [
      ...options.slice(0, index),
      { ...option, isChecked: !option.isChecked },
      ...options.slice(index + 1),
    ];
    setOptions(nextOptions);
    handleOption(nextOptions); // 요청 폼 옵션 리스트를 갱신한다.
  };

  return (
    <div className={styles.host_house_options_wrapper}>
      {options &&
        options.map((option, index) => (
          <Chip
            key={option.houseOptionId}
            color={option.isChecked ? "primary" : "default"}
            label={option.optionName}
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
