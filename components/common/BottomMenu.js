import React, { useEffect, useRef, useState } from "react";
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
import { authState, userState } from "../../state/atom/authState";
import { useRouter } from "next/router";
import likeCountState from "../../state/atom/likeCountState";
import axios from "axios";
import { get } from "../../lib/apis/apiClient";
import { getChatCount, getNoteCount } from "../../lib/apis/bottom";
import css from "styled-jsx/css";
const LIKE_BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;
const style = css`
  .overlay {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const BottomMenu = () => {
  const router = useRouter();
  const userValue = useRecoilValue(userState);
  const authValue = useRecoilValue(authState);

  const [likeCount, setLikeCount] = useRecoilState(likeCountState);
  const matches = useMediaQuery("(min-width: 600px");
  const [userData, setUserData] = useRecoilState(userState);
  const eventSource = useRef(null);
  const [userInfo, setUserInfo] = useState({
    chatCount: 0,
    noteCount: 0,
  });

  const [listening, setListening] = useState(false);
  const getChat = async (cancelToken) => {
    try {
      const getChat = await getChatCount({ userId: userData.id, cancelToken });
      if (getChat.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          chatCount: Number(getChat.data.count),
        }));
      }
    } catch (e) {
      console.log("getChat Error", e);
    }
  };
  const getNote = async (cancelToken) => {
    try {
      const getNote = await getNoteCount({ userId: userData.id, cancelToken });
      if (getNote.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          noteCount: getNote.data.result.count,
        }));
      }
    } catch (e) {
      console.log("getNote Error", e);
    }
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    async function reactive() {
      await getChat(cancelToken);
      await getNote(cancelToken);
    }
    if (userData.id) {
      reactive();
      if (!listening) {
        eventSource.current = new EventSource(
          `https://ssghot.shop/api/v1/alerts/users?param=${userData.id}`
        );

        eventSource.current.onopen = (event) => {
          console.log("connection opened");
        };
        eventSource.current.onmessage = async (event) => {
          const sseMessage = JSON.parse(event.data);

          if (sseMessage.title === "CHAT") {
            setUserInfo((prev) => ({
              ...prev,
              chatCount: prev.chatCount + 1,
            }));
          } else if (sseMessage.title === "NOTE") {
            setUserInfo((prev) => ({
              ...prev,
              noteCount: prev.noteCount + 1,
            }));
          }
        };

        eventSource.current.onerror = (event) => {
          if (event.target.readyState === EventSource.CLOSED) {
            console.log("eventsource closed (" + event.target.readyState + ")");
          }
          eventSource.current.close();
        };
      } else {
        setListening(true);
      }
    }

    // 로그인 유저인 경우
    if (authValue.isLogin) {
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
    return () => {
      if (eventSource.current !== null) eventSource.current.close();
      cancelToken.cancel();
    };
  }, []);

  const goToFavorite = () => {
    if (authValue.isLogin) {
      router.push("/like");
    } else {
      router.push("/login");
    }
  };
  if (matches) {
    return null;
  }

  return (
    <>
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <FloatingButton />
        <Paper elevation={5}>
          <BottomNavigation>
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
              onClick={() => router.push("/")}
            />
            <BottomNavigationAction
              label="Email"
              onClick={() => router.push("/mail")}
              icon={
                <Badge
                  badgeContent={userInfo.noteCount}
                  color="primary"
                  max={100}
                >
                  <EmailIcon />
                </Badge>
              }
            />
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
              onClick={goToFavorite}
            />
            <BottomNavigationAction
              label="Chat"
              onClick={() => router.push("/chat")}
              icon={
                <Badge
                  badgeContent={userInfo.chatCount}
                  color="primary"
                  max={100}
                >
                  <ChatIcon />
                </Badge>
              }
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
};

export default BottomMenu;
