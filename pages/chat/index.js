import Header from "../../components/common/Header";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import css from "styled-jsx/css";
import { useState } from "react";

const tempChat = [
  {
    id: 1,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월26일",
    cnt: 2,
  },
  {
    id: 2,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월25일",
    cnt: 100,
  },
  {
    id: 3,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월24일",
    cnt: 20,
  },
  {
    id: 4,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월20일",
    cnt: 10,
  },
];
const style = css`
  #chatlist {
    background-color: #edf1f1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 92.5vh;
    padding: 5rem 0rem;
    box-sizing: border-box;
  }
  #chat_ul {
    width: 100%;
  }
  #chat_profile {
    width: 8vh;
    height: 8vh;
  }
  #unit_chat {
    background-color: #ffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 20px;
  }
  #chat_content {
    margin-left: 1rem;
    width: 100%;
  }
  #chat_user {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #chat_text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 1rem;
  }
  #update {
    margin-left: 1rem;
    cursor: pointer;
  }
  #delete_btn {
    margin-left: 1rem;
  }
  #delete_btn img {
    width: 4vh;
    height: 4vh;
  }
`;
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    width: "40px",
    height: "20px",
  },
}));
export default function ChatList() {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      <div id="chatlist">
        <Header title="채팅" type="chat" />
        <div id="chat_ul">
          <p
            id="update"
            onClick={() => {
              setIsUpdate(!isUpdate);
            }}
          >
            편집
          </p>
          {tempChat &&
            tempChat.map((item) => (
              <div key={item.id} id="unit_chat">
                <img id="chat_profile" src={item.img} />
                <div id="chat_content">
                  <div id="chat_user">
                    <h3>{item.username}</h3>
                    <p> {item.date}</p>
                  </div>
                  <div id="chat_text">
                    <p>{item.text}</p>
                    <StyledBadge badgeContent={item.cnt} color="error" />
                  </div>
                </div>
                {isUpdate && (
                  <>
                    <div id="delete_btn">
                      <img src="/icons/trash.png" />
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
