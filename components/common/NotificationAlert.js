import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, userState } from "../../state/atom/authState";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import sseState from "../../state/atom/sseState";
export const NotificationAlert = () => {
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(userState);
  // const eventSource = useRef(null);
  const [sseData, setSseData] = useRecoilState(sseState);
  const authValue = useRecoilValue(authState);
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
  useEffect(() => {
    if (authValue.isLogin) {
      if(sseData.eventSource===null){
        setSseData({eventSource: new EventSource(
         `https://ssghot.shop/api/v1/alerts/users?param=${userData.id}`
        )})
      }
      if (sseData.eventSource!==null) {
     
        sseData.eventSource.onopen = (event) => {
          console.log("connection opened");
        };
        sseData.eventSource.onmessage = async (event) => {
          const sseMessage = JSON.parse(event.data);
          if (sseMessage.title === "CHAT") {
         
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
         
          }
        };

        sseData.eventSource.onerror = (event) => {
          if (event.target.readyState === EventSource.CLOSED) {
            console.log("eventsource closed (" + event.target.readyState + ")");
          }
          sseData.eventSource.close();
          setSseData({eventSource:null});
        };
      }
    }
  }, []);
  const handleClose = () => {
    setAlertState({ ...alertState, open: false });
  };
  const handleUrl = () => {
    router.push(url);
  };
  return (
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
  );
};
