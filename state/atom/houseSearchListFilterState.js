import { atom } from "recoil";

const houseSearchListFilterState = atom({
  key: "houseSearchListFilterState",
  default: [
    {
      id: 1,
      name: "전체",
      active: true,
    },
    {
      id: 2,
      name: "남녀공용",
      active: false,
    },
    {
      id: 3,
      name: "남성전용",
      active: false,
    },
    {
      id: 4,
      name: "여성전용",
      active: false,
    },
    {
      id: 5,
      name: "리뷰순",
      active: false,
    },
    {
      id: 6,
      name: "최저순",
      active: false,
    },
    {
      id: 7,
      name: "최고순",
      active: false,
    },
    {
      id: 8,
      name: "좋아요",
      active: false,
    },
  ],
});

export default houseSearchListFilterState;
