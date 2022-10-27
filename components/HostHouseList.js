import { Divider } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import HostHouseListItem from "./HostHouseListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const LoadingPageComment = () => {
  const style = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0px",
    left: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  };
  return <div style={style}>LOADING...</div>;
};

const LastPageComment = () => {
  const ScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const style = {
    width: "100%",
    height: "60px",
    color: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={style}>
      마지막 페이지입니다.{" "}
      <ArrowDropUpIcon fontSize="large" onClick={ScrollToTop} />
    </div>
  );
};

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
        console.log("하우스 목록 ", content);
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
        const { content } = response.data.result;
        console.log("하우스 목록 ", content);

        setHouseList((prev) => {
          return prev.concat(content);
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
        loader={<LoadingPageComment />}
        endMessage={<LastPageComment />}
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
