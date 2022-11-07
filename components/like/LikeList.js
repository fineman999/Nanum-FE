import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { get } from "../../lib/apis/apiClient";
import { authState, userState } from "../../state/atom/authState";
import LikeListItem from "./LikeListItem";
import styles from "../../styles/LikeList.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import LastPageComment from "../LastPageComment";
import { useRouter } from "next/router";
const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const LikeList = () => {
  const userValue = useRecoilValue(userState);
  const authValue = useRecoilValue(authState);
  const [likeList, setLikeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const API_URI = `/users/${userValue.id}/wishes`;
    get(BASE_URL, API_URI).then((res) => {
      const { status } = res;
      const { isSuccess, message, result } = res.data;

      if (status === 200 && isSuccess) {
        setLikeList(result.content);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className={styles.loading_circle}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="like_list_wrapper">
      <ul className={styles.like_list}>
        {likeList &&
          likeList.map((listItem) => (
            <LikeListItem key={listItem.wishId} listItem={listItem} />
          ))}
      </ul>
      <LastPageComment />
    </div>
  );
};

export default LikeList;
