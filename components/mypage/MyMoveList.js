import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { get } from "../../lib/apis/apiClient";
import { userState } from "../../state/atom/authState";
import myMoveListState from "../../state/atom/myMoveListState";
import MyMoveListFilter from "./MyMoveListFilter";
import MyMoveListItem from "./MyMoveListItem";
import filteredMyMoveListState from "../../state/selector/filteredMyMoveListState";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const MyMoveList = () => {
  const userValue = useRecoilValue(userState);
  const [myMoveList, setMyMoveList] = useRecoilState(myMoveListState);
  const filteredMyMoveList = useRecoilValue(filteredMyMoveListState);

  useEffect(() => {
    const API_URI = `/move-in/users/${userValue.id}`;

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        setMyMoveList(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my_move_list_wrapper">
      <MyMoveListFilter />
      <ul className="move_list_wrapper">
        {filteredMyMoveList &&
          filteredMyMoveList.map((listItem) => (
            <MyMoveListItem key={listItem.id} listItem={listItem} />
          ))}
      </ul>
    </div>
  );
};

export default MyMoveList;
