import { atom } from "recoil";

const myMoveFilterStateListState = atom({
  key: "myMoveFilterStateListState",
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
      name: "거부",
      active: false,
    },
    {
      id: 4,
      name: "취소",
      active: false,
    },
    {
      id: 5,
      name: "계약중",
      active: false,
    },
    {
      id: 6,
      name: "계약완료",
      active: false,
    },
  ],
});

export default myMoveFilterStateListState;
