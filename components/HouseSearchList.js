import React, { useEffect, useState } from "react";
import { get } from "../lib/apis/apiClient";
import HouseSearchFilterList from "./HouseSearchFilterList";
import HouseSearchListItem from "./HouseSearchListItem";

const HouseSearchList = ({ searchForm }) => {
  const [houseList, setHouseList] = useState([]);
  const { cPositionY, cPositionX } = searchForm;
  useEffect(() => {
    console.log("하우스 목록 검색: ", searchForm);

    if (cPositionY !== "" && cPositionX !== "") {
      const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;
      const API_URI = `/houses/search?searchWord=${searchForm.searchWord}`;

      get(BASE_URL, API_URI)
        .then((res) => res.data)
        .then((data) => setHouseList([...data.result]))
        .catch((err) => console.log(err));
    }
  }, [searchForm]);

  return (
    <>
      <HouseSearchFilterList />
      <ul className="house_list">
        {houseList &&
          houseList.map((listItem) => (
            <li className="house_list_item" key={listItem.id}>
              <HouseSearchListItem listItem={listItem} />
            </li>
          ))}
      </ul>
      <style jsx>{`
        .house_list {
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        .house_list_item {
          box-sizing: border-box;
          width: 50%;
          padding: 2.5px 2.5px;
          font-size: 10px;
        }

        @media all (min-width: 1024px) {
          .house_list {
            justify-content: left;
          }
          .house_list_item {
            box-sizing: border-box;
            width: 33.3333%;
            padding: 2.5px 2.5px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default HouseSearchList;
