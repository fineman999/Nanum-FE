import React, { Fragment, useEffect, useState } from "react";
import { userState } from "../state/atom/authState";
import { get, put } from "../lib/apis/apiClient";
import { useRecoilValue } from "recoil";
import HostMoveContractListItem from "./HostMoveContractListItem";
import { Divider } from "@mui/material";
import LastPageComment from "./LastPageComment";
import Swal from "sweetalert2";
import MoveContractFormModal from "./host/MoveContractFormModal";
import formatDate from "../lib/fomatDate";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const HostMoveContractList = () => {
  const userValue = useRecoilValue(userState);
  const [moveList, setMoveList] = useState([]);
  const [moveForm, setMoveForm] = useState({
    moveInId: "",
    expireDate: "",
  });
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    const API_URI = `/move-in/hosts/${userValue.id}`;
    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setMoveList(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickDate = (newValue) => {
    console.log(formatDate(newValue.toDate()));

    setMoveForm((prev) => {
      return {
        ...prev,
        expireDate: formatDate(newValue.toDate()),
      };
    });
  };

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
    Swal.fire({
      title: "입주 계약을 <br/>완료하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        // 입주 계약 신청 아이디 등록
        setMoveForm((prev) => {
          return {
            ...prev,
            moveInId: id,
          };
        });
        openModal();
      }
    });
  };

  return (
    <div className="host_move_list_wrapper">
      <MoveContractFormModal
        open={modal}
        handleClose={closeModal}
        moveList={moveList}
        setMoveList={setMoveList}
        moveForm={moveForm}
        handleClickDate={handleClickDate}
      />
      <ul className="move_list">
        {moveList &&
          moveList.map((listItem, index) => (
            <Fragment key={listItem.id}>
              <HostMoveContractListItem
                listItem={listItem}
                handleContract={handleContract}
                handleComplete={handleComplete}
              />
              {index !== moveList.length ? <Divider /> : ""}
            </Fragment>
          ))}
        <LastPageComment />
      </ul>
    </div>
  );
};

export default HostMoveContractList;
