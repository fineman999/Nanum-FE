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
import { userState } from "../../state/atom/authState";
import { useRouter } from "next/router";
import likeCountState from "../../state/atom/likeCountState";
import axios from "axios";
import { get } from "../../lib/apis/apiClient";
import { getChatCount, getNoteCount } from "../../lib/apis/bottom";

const LIKE_BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const BottomMenu = () => {
  const router = useRouter();
  const userValue = useRecoilValue(userState);
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
        console.log("getChat", getChat.data);
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
        console.log(getNote.data.result);
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
    if (userData) {
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
          console.log(sseMessage);
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
          console.log(event);
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
    return () => {
      eventSource.current.close();
      cancelToken.cancel();
    };
  }, []);

  if (matches) {
    return null;
  }

  const goToLike = () => {};

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}>
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
              <Badge badgeContent={userInfo.noteCount} color="primary" max={10}>
                <EmailIcon />
              </Badge>
            }
          />
          <BottomNavigationAction
            label="Favorite"
            icon={
              likeCount >= 0 ? (
                <Badge
                  badgeContent={likeCount}
                  color="primary"
                  max={10}
                  onClick={goToLike}
                >
                  <FavoriteIcon />
                </Badge>
              ) : (
                <FavoriteIcon />
              )
            }
          />
          <BottomNavigationAction
            label="Chat"
            onClick={() => router.push("/chat")}
            icon={
              <Badge badgeContent={userInfo.chatCount} color="primary" max={10}>
                <ChatIcon />
              </Badge>
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomMenu;
