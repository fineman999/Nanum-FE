import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { get } from "../lib/apis/apiClient";
import HouseSearchListItem from "./HouseSearchListItem";

const HouseSearchList = ({ searchForm, setSearchForm }) => {
  const router = useRouter();
  const [houseList, setHouseList] = useState([]);

  useEffect(() => {
    const encodeUri = decodeURIComponent(router.asPath);
    let nextSearchWord = encodeUri.split("=")[1].split("+").join(" ");

    const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;
    const API_URI = `/houses/search?searchWord=${nextSearchWord}`;

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => setHouseList([...data.result]))
      .catch((err) => console.log(err));

    setSearchForm({
      ...searchForm,
      searchWord: nextSearchWord,
    });
  }, [router.asPath]);

  return (
    <>
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
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .house_list_item {
          box-sizing: border-box;
          width: 49%;
          margin-bottom: 12px;
          font-size: 10px;
        }

        @media all (min-width: 1024px) {
          .house_list {
            justify-content: left;
          }
          .house_list_item {
            box-sizing: border-box;
            width: 33.3333%;
            margin-bottom: 12px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default HouseSearchList;
