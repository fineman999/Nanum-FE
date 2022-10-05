import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";
import { Favorite } from "@mui/icons-material";
import { fireAlert } from "./Alert";

const LikeButton = ({ isLike = false }) => {
  const [like, setLike] = useState(isLike);
  const [likeClicked, setLikeClicked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    if (likeClicked) {
      return null;
    }

    setLike(!like);
    setLikeClicked(true);

    if (!like) {
      setTimeout(() => {
        fireAlert({ icon: "success", title: "좋아요 하우스 추가" });
        setLikeClicked(false);
      }, 0);
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
