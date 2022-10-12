import axios from "axios";
import React, { useEffect, useState } from "react";
import HostHouseListItem from "./HostHouseListItem";

const HostHouseList = () => {
  const [houstList, setHoustList] = useState([]);
  useEffect(() => {
    const requestApi = async () => {
      try {
        const response = await axios.get(
          `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}/houses/1`
        );

        console.log(response.data);
        const data = [...response.data.result.content];
        setHoustList(data);
      } catch (err) {
        console.log(err);
      }
    };

    requestApi();
  }, []);
  return (
    <ul className="host_houst_list">
      {houstList &&
        houstList.map((listItem) => (
          <HostHouseListItem key={listItem.id} item={listItem} />
        ))}
    </ul>
  );
};

export default HostHouseList;
