import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import HouseSearchFilterList from "./HouseSearchFilterList";
import HouseSearchListItem from "./HouseSearchListItem";
import filteredHouseSearchListState from "../state/selector/filteredHouseSearchListState";

const HouseSearchList = ({ houseList }) => {
  const filteredHouseList = useRecoilValue(filteredHouseSearchListState);
  return (
    <>
      <HouseSearchFilterList />
      <ul className="house_list">
        {filteredHouseList &&
          filteredHouseList.map((listItem) => (
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
