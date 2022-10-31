import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";
import { Favorite } from "@mui/icons-material";
import { fireAlert } from "./Alert";
import { userState } from "../../state/atom/authState";
import { useRecoilValue } from "recoil";
import { post } from "../../lib/apis/apiClient";

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const LikeButton = ({ isLike = false, listItem }) => {
  const userValue = useRecoilValue(userState);
  const [like, setLike] = useState(isLike);
  const [likeClicked, setLikeClicked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    if (likeClicked) {
      return null;
    }

    // setLike(!like);
    // setLikeClicked(true);

    if (!like) {
      const API_URI = `/users/${userValue.id}/wishes`;
      const { id } = listItem;

      post(BASE_URL, API_URI, {
        houseId: id,
      }).then((res) => console.log(res));
      // setTimeout(() => {
      //   fireAlert({ icon: "success", title: "좋아요 하우스 추가" });

      //   setLikeClicked(false);
      // }, 0);
    } else {
      setTimeout(() => {
        fireAlert({ icon: "success", title: "좋아요 하우스 삭제" });
        setLikeClicked(false);
      }, 0);
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
