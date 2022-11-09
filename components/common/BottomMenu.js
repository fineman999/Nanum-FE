import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertTitle,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Snackbar,
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
  const [alertState, setAlertState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    title: "",
    content: "",
    url: "",
  });
  const timerId = useRef(null);
  const { vertical, horizontal, open, title, content, url } = alertState;

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
  const handleClose = () => {
    setAlertState({ ...alertState, open: false });
  };
  const handleUrl = () => {
    router.push(url);
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    async function reactive() {
      await getChat(cancelToken);
      await getNote(cancelToken);
    }
    if (authValue.isLogin) {
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
            const result = JSON.parse(sseMessage.content);
            if (timerId.current !== null) {
              clearTimeout(timerId.current);
            }
            setAlertState((prev) => ({
              ...prev,
              open: true,
              title: "채팅이 왔습니다.",
              content: result.lastMessage,
              url: sseMessage.url,
            }));
            timerId.current = setTimeout(() => {
              setAlertState({ ...alertState, open: false });
            }, 2000);
          } else if (sseMessage.title === "NOTE") {
            if (timerId.current !== null) {
              clearTimeout(timerId.current);
            }

            setAlertState((prev) => ({
              ...prev,
              open: true,
              title: "쪽지가 왔습니다.",
              content: sseMessage.content,
              url: sseMessage.url,
            }));
            timerId.current = setTimeout(() => {
              setAlertState({ ...alertState, open: false });
            }, 2000);
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
  const goToMail = () => {
    if (authValue.isLogin) {
      router.push("/mail");
    } else {
      router.push("/login");
    }
  };
  const goToChat = () => {
    if (authValue.isLogin) {
      router.push("/chat");
    } else {
      router.push("/login");
    }
  };
  if (matches) {
    return null;
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        onClick={handleUrl}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          <AlertTitle>{title}</AlertTitle>
          {content}
        </Alert>
      </Snackbar>
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
              onClick={goToMail}
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
              onClick={goToChat}
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
