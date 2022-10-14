import { Divider } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import HostHouseListItem from "./HostHouseListItem";
import InfiniteScroll from "react-infinite-scroll-component";

const HostHouseList = () => {
  const [houseList, setHouseList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [defaultSize, setDefaultSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const requestApi = async () => {
      try {
        const response = await axios.get(
          `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}/houses/1?page=${curPage}&size=${defaultSize}&sort=createAt,desc`
        );

        const { content, totalPages } = response.data.result;
        setHouseList(content);
        setCurPage((prev) => prev + 1);
        setTotalPages(totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    requestApi();
  }, []);

  const fetchMoreData = () => {
    if (curPage === totalPages) {
      setHasMore(false);
      return;
    }

    const fetchApi = async () => {
      try {
        const response = await axios.get(
          `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}/houses/1?page=${curPage}&size=${defaultSize}&sort=createAt,desc`
        );
        const data = [...response.data.result.content];
        setHouseList((prev) => {
          return prev.concat(data);
        });
        setCurPage((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  };

  return (
    <ul className="host_houst_list">
      <InfiniteScroll
        dataLength={houseList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<div>마지막 페이지입니다.</div>}
      >
        {houseList &&
          houseList.map((listItem, index) => (
            <Fragment key={listItem.id}>
              <HostHouseListItem item={listItem} />
              {index !== houseList.length - 1 ? <Divider /> : ""}
            </Fragment>
          ))}
      </InfiniteScroll>
    </ul>
  );
};

export default HostHouseList;
