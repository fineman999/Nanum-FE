import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";
import { Favorite } from "@mui/icons-material";
import { fireAlert } from "./Alert";
import { userState } from "../../state/atom/authState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { del, post } from "../../lib/apis/apiClient";
import likeCountState from "../../state/atom/likeCountState";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const LikeButton = ({ isLike = false, listItem, wishId }) => {
  const userValue = useRecoilValue(userState);
  const [like, setLike] = useState(isLike);
  const [likeClicked, setLikeClicked] = useState(false);
  const setLikeCount = useSetRecoilState(likeCountState);
  const [likeId, setLikeId] = useState(wishId);
  const router = useRouter();

  useEffect(() => {
    setLike(isLike);
    setLikeId(wishId);
  }, [listItem]);

  const handleLike = (e) => {
    e.stopPropagation();

    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if (!ACCESS_TOKEN) {
      Swal.fire({
        title: "로그인 페이지로<br/>이동하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    if (likeClicked) {
      return null;
    }

    setLike(!like);
    setLikeClicked(true);

    if (!like) {
      const API_URI = `/users/${userValue.id}/wishes`;
      const { id } = listItem;

      post(BASE_URL, API_URI, {
        houseId: id,
      })
        .then((res) => {
          // console.log("좋아요 추가", res);

          const { status } = res;
          const { isSuccess, message, result } = res.data;
          if (status === 201 && isSuccess) {
            fireAlert({ icon: "success", title: "좋아요 추가" });
            setLikeClicked(false);
            setLikeId(result.wishId);
            setLikeCount((prev) => prev + 1);
          }
        })
        .catch((err) => console.log(err));
    } else {
      const API_URI = `/users/${userValue.id}/wishes/${likeId}`;

      del(BASE_URL, API_URI).then((res) => {
        // console.log("좋아요 제거", res);

        const { status } = res;
        setLikeClicked(false);
        if (status === 204) {
          fireAlert({ icon: "success", title: "좋아요 제거" });
          setLikeClicked(false);
          setLikeCount((prev) => prev - 1);
        }
      });
    }
  };

  return (
    <div className="like_btn" onClick={handleLike}>
      {like ? (
        <Favorite sx={{ color: pink[500] }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: pink[500] }} />
      )}
    </div>
  );
};

export default LikeButton;
