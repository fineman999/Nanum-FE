import { Divider } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import HostHouseListItem from "./HostHouseListItem";

const HostHouseList = () => {
  const [houseList, setHouseList] = useState([]);
  useEffect(() => {
    const requestApi = async () => {
      try {
        const response = await axios.get(
          `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}/houses/1`
        );

        console.log(response.data);
        const data = [...response.data.result.content];
        setHouseList(data);
      } catch (err) {
        console.log(err);
      }
    };

    requestApi();
  }, []);
  return (
    <ul className="host_houst_list">
      {houseList &&
        houseList.map((listItem, index) => (
          <Fragment key={listItem.id}>
            <HostHouseListItem item={listItem} />
            {index !== houseList.length - 1 ? <Divider /> : ""}
          </Fragment>
        ))}
    </ul>
  );
};

export default HostHouseList;
