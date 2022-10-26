import React, { useEffect, useState } from "react";
import NoticeListItem from "./NoticeListItem";
import { Divider } from "@mui/material";
import axios from "axios";
import * as Api from "../lib/apis/apiClient";
const NoticeList = ({ list }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (list && list.length > 0) {
      setBoards(list);
    }
  }, [list]);
  return (
    <div className="notice_list_wrapper">
      <ul className="notice_list">
        {boards &&
          boards.map((item, idx) => (
            <>
              <Divider />
              <NoticeListItem
                id={item.id}
                key={idx}
                date={item.createAt}
                title={item.title}
                viewCount={item.viewCount}
              />
            </>
          ))}
      </ul>
    </div>
  );
};

export default NoticeList;
