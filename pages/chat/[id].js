import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import IconButton from "@mui/joy/IconButton";
import { GetMessage, SendMessage } from "../../components/common/Message";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import { useRef } from "react";
import { useRouter } from "next/router";

const style = css`
  #chat {
  }
  #chat_body {
    height: -webkit-fill-available;
    margin-top: 64px;
    padding: 0rem 0.5rem;
    position: fixed;
    bottom: 120px;
    overflow-y: scroll;
    width: -webkit-fill-available;
  }
  #send_form {
    background-color: #ffff;
    padding: 2rem;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: -webkit-fill-available;
  }
  #send_form input {
    border: none;
    height: 40px;
    width: 100%;
    font-size: 1.2rem;
    background-color: azure;
    padding: 0.2rem 1rem;
    border-radius: 20px;
    margin-right: 1rem;
  }
  #send_form input:focus {
    outline: none;
  }
`;
export default function Chat() {
  const [msg, setMsg] = useState("");
  const [message, setMessage] = useState([]);
  const [sendMsg, setSendMsg] = useState(false);
  const userData = useRecoilState(userState);
  const messageBoxRef = useRef();
  const router = useRouter();
  const { id: roomNum } = router.query;

  //채팅목록 젤  하단으로
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  let userId = userData[0].id;
  const uri = `ws://20.214.170.222:8000/web-flux-service/chat?room=${roomNum}&userId=${userId}`;
  let ws = useRef(null);

  //소켓 열기
  const onOpen = async () => {
    ws.current = new WebSocket(uri);
    ws.current.onopen = (e) => {
      console.log("open", e);
    };
    ws.current.onclose = (e) => {
      console.log("close", e);
    };
    ws.current.onerror = (e) => {
      console.log("error", e);
    };
    ws.current.onmessage = (e) => {
      let obj = JSON.parse(e.data);
      setMessage((prev) => [...prev, obj]);
    };
  };

  // //소켓 메시지 보내기
  const sendMessage = () => {
    let obj = {
      sender: userData[0].id + "",
      message: msg,
      username: userData[0].nickName,
      type: "MESSAGE",
      createAt: new Date(),

      img: userData[0].profileImgUrl,
    };
    ws.current.send(JSON.stringify(obj));
    setMsg("");
    setSendMsg(!sendMsg);
    // console.log(userData[0]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    onOpen();
  }, [ws]);

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <>
      <div id="chat">
        <Header title="채팅" type="chat" />
        <section id="chat_body" ref={messageBoxRef}>
          {message &&
            message.map((m, idx) => (
              <div key={idx}>
                {m.sender == userId ? (
                  <SendMessage
                    text={m.message}
                    time={m.createAt}
                    nickName={m.username}
                    profileImgUrl={m.img}
                  />
                ) : (
                  <GetMessage
                    text={m.message}
                    time={m.createAt}
                    nickName={m.username}
                    profileImgUrl={m.img}
                  />
                )}
              </div>
            ))}
        </section>
        <section id="send_form">
          <input
            type="text"
            value={msg}
            placeholder="메세지를 입력하세요."
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <IconButton
            variant="outlined"
            sx={{ borderRadius: "100%", height: "40px" }}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
