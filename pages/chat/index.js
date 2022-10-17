import Header from "../../components/common/Header";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import css from "styled-jsx/css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProfileImg } from "../../components/common/Profile";

import * as Api from "../../lib/apis/apiClient";
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
  const [chatLists, setChatLists] = useState([]);
  const router = useRouter();
  const goChat = (id) => {
    router.push(`/chat/${id}`);
  };
  const getChats = async () => {
    // setChatLists([]);

    const userId = sessionStorage.getItem("userId");
    try {
      const getChatLists = await Api.get(
        `http://20.214.170.222:8000/web-flux-service/api/v1/rooms/users/`,
        userId
      );

      if (!getChatLists) {
        throw new Error(`${getChatLists} not allowd`);
      }

      const findUserInfos = [];
      getChatLists.data.forEach((data) => {
        const userInfo = data.roomInfo;
        userInfo.users.forEach((user) => {
          findUserInfos.push(user.userId);
        });
      });
      const getUserInfos = await Api.get(
        `http://20.214.170.222:8000/user-service/api/v1/users/particular?param=`,
        findUserInfos
      );

      const chats2 = getChatLists.data;
      let chat = {};
      chats2.forEach((ele) => {
        console.log(ele);
        const userInfo = ele.roomInfo;

        // 두명
        if (ele.houseId == 0) {
          console.log(ele.houseId);
          userInfo.users.forEach((user) => {
            getUserInfos.data.result.forEach((i) => {
              if (user.userId == i.id && i.id != userId) {
                chat = {
                  img: i.profileImgUrl,
                  username: i.nickName,
                  text: `${
                    userInfo.lastMessage === null ? "" : userInfo.lastMessage
                  }`,
                };
              }
            });
            if (user.userId == userId) {
              chat.cnt = user.readCount;
              chat.id = ele.id;
              chat.date = ele.updateAt;
            }
          });
        } else if (ele.houseId != 0) {
          // 채팅 방
          userInfo.users.forEach((user) => {
            getUserInfos.data.result.forEach((i) => {
              if (userInfo.lastSentUserId != null) {
                if (userInfo.lastSentUserId == i.id) {
                  chat = {
                    img: ele.houseImg,
                    username: ele.roomName,
                    text: `${
                      userInfo.lastMessage == null ? "" : userInfo.lastMessage
                    }`,
                  };
                }
              } else {
                chat = {
                  img: `/images/default.png`,
                  username: ele.roomName,
                  text: `${
                    userInfo.lastMessage == null ? "" : userInfo.lastMessage
                  }`,
                  cnt: 0,
                };
              }
              if (user.userId == userId) {
                chat.id = ele.id;
                chat.date = ele.updateAt;
                chat.cnt = user.readCount;
              }
            });
          });
        }
        // console.log("chat" + chat.id);
        // console.log("chat" + chat.img);
        // console.log("chat" + chat.username);
        // console.log("chat" + chat.date);
        // console.log("chat" + chat.text);
        // console.log("chat" + chat.cnt);
        console.log(chatLists, chat);
        setChatLists((prev) => [...prev, chat]);
        // chat = {};
      });
    } catch (e) {
      console.log("Error" + e);
    }
  };

  useEffect(() => {
    getChats();
  }, []);
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
          {chatLists &&
            chatLists.map((item, idx) => (
              <div key={idx} id="unit_chat">
                <ProfileImg
                  id={item.id}
                  img={item.img}
                  size={8}
                  name={item.username}
                  type={2}
                />
                <div id="chat_content" onClick={() => goChat(item.id)}>
                  <div id="chat_user">
                    <h3>{item.username}</h3>
                    <p> {item.date}</p>
                  </div>
                  <div id="chat_text">
                    <p>{item.text}</p>
                    <StyledBadge badgeContent={0} color="error" />
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
