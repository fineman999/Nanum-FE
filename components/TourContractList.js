import React, { Fragment, useEffect } from "react";
import TourContractListItem from "./TourContractListItem";

import styles from "../styles/TourContractList.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { get, post, put } from "../lib/apis/apiClient";
import { userState } from "../state/atom/authState";
import { Divider } from "@mui/material";
import { fireAlert } from "./common/Alert";
import tourListState from "../state/atom/tourListState";
import filteredTourListState from "../state/selector/filteredTourListState";
import { useRouter } from "next/router";
import LastPageComment from "./LastPageComment";
import Swal from "sweetalert2";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const TourContractList = () => {
  const router = useRouter();

  const userValue = useRecoilValue(userState);
  const [tourList, setTourList] = useRecoilState(tourListState);
  const filteredTourList = useRecoilValue(filteredTourListState);

  useEffect(() => {
    const API_URI = `/tours/users/${userValue.id}`;

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        setTourList([...data.result]);
      })
      .catch((err) => console.log("사용자 투어 목록 조회 오류", err));
  }, []);

  const handleCancel = (id) => {
    const nextTourList = tourList.map((listItem) => {
      return listItem.id === id
        ? { ...listItem, houseTourStatus: "CANCELED" }
        : listItem;
    });

    const API_URI = "/tours";
    const formData = {
      houseTourId: id,
      houseTourStatus: "CANCELED",
    };

    put(BASE_URL, API_URI, formData)
      .then((res) => {
        const { status } = res;
        const { result } = res.data;
        if (status === 200) {
          fireAlert({ icon: "success", title: result });
          setTourList(nextTourList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMove = (houseId, roomId) => {
    Swal.fire({
      title: "입주 신청 <br/>하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        router.push({
          pathname: "/move",
          query: {
            houseId: houseId,
            roomId: roomId,
          },
        });
      }
    });
  };

  return (
    <div className={styles.tour_contract_list_wrapper}>
      <ul className={styles.contract_list}>
        {filteredTourList &&
          filteredTourList.map((contract, index) => (
            <Fragment key={contract.id}>
              <TourContractListItem
                contract={contract}
                handleCancel={handleCancel}
                handleMove={handleMove}
              />
              {index !== filteredTourList.length - 1 ? <Divider /> : ""}
            </Fragment>
          ))}
      </ul>
      <LastPageComment />
    </div>
  );
};

export default TourContractList;
