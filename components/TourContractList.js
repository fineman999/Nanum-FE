import React, { Fragment, useEffect, useState } from "react";
import TourContractListItem from "./TourContractListItem";

import styles from "../styles/TourContractList.module.css";
import { useRecoilValue } from "recoil";
import { get, put } from "../lib/apis/apiClient";
import { userState } from "../state/atom/authState";
import { Divider } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const LastPageComment = () => {
  const ScrollToTop = () => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
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

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const TourContractList = () => {
  const userValue = useRecoilValue(userState);
  const [contractList, setContractList] = useState([]);
  useEffect(() => {
    const API_URI = `/tours/users/${userValue.id}`;

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => setContractList([...data.result]))
      .catch((err) => console.log("사용자 투어 목록 조회 오류", err));
  }, []);

  // 투어 취소
  // WAITING("대기 중"),
  // APPROVED("승인 완료됨"),
  // REJECTED("거부됨"),
  // CANCELED("취소됨"),
  // TOUR_COMPLETED("투어 완료됨");
  const handleCancel = (id) => {
    const API_URI = "/tours";

    const formData = {
      houseTourId: id,
      houseTourStatus: "CANCELED",
    };

    put(BASE_URL, API_URI, formData).then((res) => console.log(res));
  };

  return (
    <div className={styles.tour_contract_list_wrapper}>
      <ul className={styles.contract_list}>
        {contractList &&
          contractList.map((contract, index) => (
            <Fragment key={contract.id}>
              <TourContractListItem
                contract={contract}
                handleCancel={handleCancel}
              />
              {index !== contractList.length - 1 ? <Divider /> : ""}
            </Fragment>
          ))}
      </ul>
      <LastPageComment />
    </div>
  );
};

export default TourContractList;
