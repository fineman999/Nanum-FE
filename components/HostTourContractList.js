import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { get, put } from "../lib/apis/apiClient";
import { userState } from "../state/atom/authState";
import HostTourContractListItem from "./HostTourContractListItem";
import { Divider } from "@mui/material";
import LastPageComment from "./LastPageComment";
import filteredHostTourListState from "../state/selector/filteredHostTourListState";
import hostTourListState from "../state/atom/hostTourListState";
import { fireAlert } from "./common/Alert";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;
const API_URI = "/tours";

const HostTourContractList = () => {
  const userValue = useRecoilValue(userState);
  const [contractList, setContractList] = useState([]);
  const [hostTourList, setHostTourList] = useRecoilState(hostTourListState);
  const filteredHostTourList = useRecoilValue(filteredHostTourListState);

  useEffect(() => {
    // const API_URI = `/tours/hosts/${userStateValue.id}`;
    const API_URI = `/tours/hosts/1`;
    console.log(filteredHostTourList);
    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setHostTourList(data.result);
      });
  }, []);

  const handleApprove = (id) => {
    const nextHostTourList = hostTourList.map((listItem) => {
      return listItem.id === id
        ? { ...listItem, houseTourStatus: "APPROVED" }
        : listItem;
    });

    const formData = {
      houseTourId: id,
      houseTourStatus: "APPROVED",
    };

    put(BASE_URL, API_URI, formData)
      .then((res) => {
        console.log("투어 신청 승인: ", res);
        const { status } = res;
        const { result } = res.data;
        if (status === 200) {
          fireAlert({ icon: "success", title: result });
          setHostTourList(nextHostTourList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = (id) => {
    const nextHostTourList = hostTourList.map((listItem) => {
      return listItem.id === id
        ? { ...listItem, houseTourStatus: "REJECTED" }
        : listItem;
    });

    const formData = {
      houseTourId: id,
      houseTourStatus: "REJECTED",
    };

    put(BASE_URL, API_URI, formData)
      .then((res) => {
        console.log("투어 신청 거부: ", res);
        const { status } = res;
        const { result } = res.data;
        if (status === 200) {
          fireAlert({ icon: "success", title: result });
          setHostTourList(nextHostTourList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComplete = (id) => {
    const nextHostTourList = hostTourList.map((listItem) => {
      return listItem.id === id
        ? { ...listItem, houseTourStatus: "TOUR_COMPLETED" }
        : listItem;
    });

    const formData = {
      houseTourId: id,
      houseTourStatus: "TOUR_COMPLETED",
    };

    put(BASE_URL, API_URI, formData)
      .then((res) => {
        console.log("투어 완료: ", res);
        const { status } = res;
        const { result } = res.data;
        if (status === 200) {
          fireAlert({ icon: "success", title: result });
          setHostTourList(nextHostTourList);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="host_tour_contract_list_wrapper">
      <ul className="contract_list">
        {filteredHostTourList &&
          filteredHostTourList.map((contract, index) => (
            <Fragment key={contract.id}>
              <HostTourContractListItem
                key={contract.id}
                contract={contract}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleComplete={handleComplete}
              />
              {index !== contractList.length - 1 ? <Divider /> : ""}
            </Fragment>
          ))}
      </ul>
      <LastPageComment />
    </div>
  );
};

export default HostTourContractList;
