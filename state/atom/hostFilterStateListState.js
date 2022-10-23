import { atom } from "recoil";

const hostFilterStateListState = atom({
  key: "hostFilterStateListState",
  default: [
    {
      id: 1,
      name: "전체",
      active: true,
    },
    {
      id: 2,
      name: "대기",
      active: false,
    },
    {
      id: 3,
      name: "승인",
      active: false,
    },
    {
      id: 4,
      name: "거부",
      active: false,
    },
    {
      id: 5,
      name: "취소",
      active: false,
    },
    {
      id: 6,
      name: "완료",
      active: false,
    },
  ],
});

export default hostFilterStateListState;
