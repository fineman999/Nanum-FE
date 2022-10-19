import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { get, put } from "../lib/apis/apiClient";
import { userState } from "../state/atom/authState";
import HostTourContractListItem from "./HostTourContractListItem";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Divider } from "@mui/material";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;
const API_URI = "/tours";

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

const HostTourContractList = () => {
  const userStateValue = useRecoilValue(userState);
  const [contractList, setContractList] = useState([]);
  useEffect(() => {
    // const API_URI = `/tours/hosts/${userStateValue.id}`;
    const API_URI = `/tours/hosts/1`;

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setContractList([...data.result]);
      });
  }, []);

  const handleApprove = (id) => {
    const formData = {
      houseTourId: id,
      houseTourStatus: "APPROVED",
    };

    put(BASE_URL, API_URI, formData).then((res) => console.log(res));
  };

  const handleReject = (id) => {
    const formData = {
      houseTourId: id,
      houseTourStatus: "REJECTED",
    };

    put(BASE_URL, API_URI, formData).then((res) => console.log(res));
  };

  const handleComplete = (id) => {
    const formData = {
      houseTourId: id,
      houseTourStatus: "TOUR_COMPLETED",
    };

    put(BASE_URL, API_URI, formData).then((res) => console.log(res));
  };

  return (
    <div className="host_tour_contract_list_wrapper">
      <ul className="contract_list">
        {contractList &&
          contractList.map((contract, index) => (
            <>
              <HostTourContractListItem
                key={contract.id}
                contract={contract}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleComplete={handleComplete}
              />
              {index !== contractList.length - 1 ? <Divider /> : ""}
            </>
          ))}
      </ul>
      <LastPageComment />
    </div>
  );
};

export default HostTourContractList;
