import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { get } from "../../lib/apis/apiClient";
import { userState } from "../../state/atom/authState";
import MyMoveListItem from "./MyMoveListItem";

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;

const MyMoveList = () => {
  const userValue = useRecoilValue(userState);
  const [moveList, setMoveList] = useState([]);
  useEffect(() => {
    const API_URI = `/move-in/users/${userValue.id}`;
    console.log(userValue);

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setMoveList(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my_move_list_wrapper">
      <ul className="move_list_wrapper">
        {moveList &&
          moveList.map((listItem) => (
            <MyMoveListItem key={listItem.id} listItem={listItem} />
          ))}
      </ul>
    </div>
  );
};

export default MyMoveList;
