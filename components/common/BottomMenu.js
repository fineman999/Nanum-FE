import React, { useEffect } from "react";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import FloatingButton from "./FloatingButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../state/atom/authState";
import { get } from "../../lib/apis/apiClient";
import likeCountState from "../../state/atom/likeCountState";

const LIKE_BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const BottomMenu = () => {
  const userValue = useRecoilValue(userState);
  const [likeCount, setLikeCount] = useRecoilState(likeCountState);
  const matches = useMediaQuery("(min-width: 600px");

  useEffect(() => {
    // 로그인 유저인 경우
    if (userValue.id) {
      const LIKE_API_URI = `/users/${userValue.id}/wishes`;

      get(LIKE_BASE_URL, LIKE_API_URI)
        .then((res) => {
          const { status } = res;
          const { isSuccess, message, result } = res.data;
          const { totalElements } = res.data.result;

          if (status === 200 && isSuccess) {
            setLikeCount(totalElements);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  if (matches) {
    return null;
  }

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}>
      <FloatingButton />
      <Paper elevation={5}>
        <BottomNavigation>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Email" icon={<EmailIcon />} />
          <BottomNavigationAction
            label="Favorite"
            icon={
              likeCount >= 0 ? (
                <Badge badgeContent={likeCount} color="primary" max={10}>
                  <FavoriteIcon />
                </Badge>
              ) : (
                <FavoriteIcon />
              )
            }
          />
          <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomMenu;
