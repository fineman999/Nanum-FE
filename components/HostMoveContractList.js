import React, { useEffect, useState } from "react";
import { userState } from "../state/atom/authState";
import { get } from "../lib/apis/apiClient";
import { useRecoilValue } from "recoil";
const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const HostMoveContractList = () => {
  const userValue = useRecoilValue(userState);
  const [contractList, setContractList] = useState([]);
  useEffect(() => {
    // const API_URI = `/users/${userValue.id}/move-in`;
    const API_URI = `/move-in/hosts/1`;

    get(BASE_URL, API_URI).then((res) => console.log(res));
  }, []);

  return <div></div>;
};

export default HostMoveContractList;
