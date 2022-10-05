import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import IconButton from "@mui/joy/IconButton";
import { GetMessage, SendMessage } from "../../components/common/Message";

//type:0 받은거 1:보낸거
const message = [
  { id: 1, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 2,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
  { id: 3, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 4,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
  { id: 5, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 6,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
  { id: 7, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 8,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
  { id: 9, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 10,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
  { id: 11, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 12,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요!!! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
  {
    id: 13,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
  { id: 14, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 15,
    type: 1,
    text: "안녕하세요! 혹시 관리비에 어떤 요금이 포함되어있나요?",
    date: "오후 07:30",
  },
  { id: 16, type: 0, date: "오후 07:30", text: "안녕하세요" },
  {
    id: 17,
    type: 1,
    date: "오후 07:30",
    text: "안녕하세요!!! 혹시 관리비에 어떤 요금이 포함되어있나요?",
  },
];
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
  return (
    <>
      <div id="chat">
        <Header title="채팅" type="chat" />
        <section id="chat_body">
          {message &&
            message.map((m) => (
              <div key={m.id}>
                {m.type == 1 ? (
                  <SendMessage text={m.text} time={m.date} />
                ) : (
                  <GetMessage text={m.text} time={m.date} />
                )}
              </div>
            ))}
        </section>
        <section id="send_form">
          <input type="text" placeholder="메세지를 입력하세요." />
          <IconButton
            variant="outlined"
            sx={{ borderRadius: "100%", height: "40px" }}
          >
            <SendIcon />
          </IconButton>
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
