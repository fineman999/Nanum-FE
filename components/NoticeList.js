import React from "react";
import NoticeListItem from "./NoticeListItem";
import { Divider } from "@mui/material";

const NoticeList = () => {
  return (
    <div className="notice_list_wrapper">
      <ul className="notice_list">
        <Divider />
        <NoticeListItem />
        <Divider />
        <NoticeListItem />
        <Divider />
        <NoticeListItem />
        <Divider />
        <NoticeListItem />
        <Divider />
        <NoticeListItem />
        <Divider />
        <NoticeListItem />
      </ul>
    </div>
  );
};

export default NoticeList;
