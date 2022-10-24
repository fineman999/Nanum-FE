import React, { useEffect, useState } from "react";
import { userState } from "../state/atom/authState";
import { get, put } from "../lib/apis/apiClient";
import { useRecoilValue } from "recoil";
import HostMoveContractListItem from "./HostMoveContractListItem";
const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const HostMoveContractList = () => {
  const userValue = useRecoilValue(userState);
  const [moveList, setMoveList] = useState([]);
  useEffect(() => {
    // const API_URI = `/users/${userValue.id}/move-in`;
    const API_URI = `/move-in/hosts/1`;

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setMoveList(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleContract = (id) => {
    const nextMoveList = moveList.map((listItem) =>
      id === listItem.id
        ? { ...listItem, moveInStatus: "CONTRACTING" }
        : listItem
    );

    const API_URI = `/move-in`;
    const formData = {
      moveInId: id,
      moveInStatus: "CONTRACTING",
      expireDate: null,
    };

    // 입주 계약 승인 API 요청
    put(BASE_URL, API_URI, formData)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setMoveList(nextMoveList);
          return data;
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleComplete = (id) => {
    const nextMoveList = moveList.map((listItem) =>
      id === listItem.id
        ? { ...listItem, moveInStatus: "CONTRACT_COMPLETED" }
        : listItem
    );

    const API_URI = `/move-in`;
    const formData = {
      moveInId: id,
      moveInStatus: "CONTRACT_COMPLETED",
      expireDate: "2100-10-10",
    };

    // 입주 계약 완료 API 요청
    put(BASE_URL, API_URI, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setMoveList(nextMoveList);
  };

  return (
    <div className="host_move_list_wrapper">
      <ul className="move_list">
        {moveList &&
          moveList.map((listItem) => (
            <HostMoveContractListItem
              key={listItem.id}
              listItem={listItem}
              handleContract={handleContract}
              handleComplete={handleComplete}
            />
          ))}
      </ul>
    </div>
  );
};

export default HostMoveContractList;
