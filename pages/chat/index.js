import Header from "../../components/common/Header";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import css from "styled-jsx/css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ProfileImg } from "../../components/common/Profile";
import {
  getSessionId,
  displayedAt,
  getCurrentDate,
  displayedASpringMVC,
} from "../../lib/utils/useful-functions";
import * as Api from "../../lib/apis/apiClient";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atom/authState";

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
    padding: 0.3rem;
    margin: 1rem;
    border-radius: 20px;
    opacity: 1;
    transition: 0.3s;
  }
  #unit_chat:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
  #chat_content {
    margin-left: 1rem;
    width: 100%;
    height: 8vh;
    justify-content: center;
    flex-direction: column;
    /* align-items: center; */
    display: flex;
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
  const [data, setData] = useState([]);
  const content = useRef();
  const eventSource = useRef();
  const userData = useRecoilValue(userState);
  const router = useRouter();
  const goChat = (id) => {
    router.push(`/chat/${id}`);
  };

  const getChats = async () => {
    // setChatLists([]);
    console.log(userData, "~~~~~~~");
    const userId = userData.id;
    let getChatLists = null;
    try {
      getChatLists = await Api.get(
        `http://20.214.170.222:8000/web-flux-service/api/v1/rooms/users/`,
        userId
      );
      if (!getChatLists) {
        throw new Error(`${getChatLists} not allowd`);
      }
    } catch (e) {
      console.log("Error" + e);
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

    chats2.forEach((ele) => {
      let chat = {};
      const userInfo = ele.roomInfo;

      // 두명
      if (ele.houseId == 0) {
        userInfo.users.forEach((user) => {
          getUserInfos.data.result.forEach((i, x) => {
            if (user.userId == i.id && i.id != userId) {
              chat = {
                img: i.profileImgUrl,
                username: i.nickName,
                text: `${
                  userInfo.lastMessage === null ? "" : userInfo.lastMessage
                }`,
                id: ele.id,
                date: displayedASpringMVC(userInfo.updateAt),
                cnt: `${
                  userInfo.users[0].userId == userId
                    ? userInfo.users[0].readCount
                    : userInfo.users[1].readCount
                }`,
              };
            }
          });
        });
      } else if (ele.houseId != 0) {
        // 채팅 방
        userInfo.users.forEach((user) => {
          if (user.userId == userId) {
            chat = {
              img: ele.houseImg,
              username: ele.roomName,
              text: `${
                userInfo.lastMessage == null ? "" : userInfo.lastMessage
              }`,
              cnt: `${user.readCount}`,
              id: ele.id,
              date: displayedASpringMVC(userInfo.updateAt),
            };
          }
        });
      }
      setChatLists((prev) => [...prev, chat]);
    });
  };
  const connectSse = async () => {
    const userId = userData.id;
    eventSource.current = new EventSource(
      `http://20.214.170.222:8000/web-flux-service/api/v1/alerts/users?param=${userId}`,
      { withCredentials: true }
    ); //구독
    // const  eventSource = new EventSource(`http://localhost:8080/api/v1/alerts/users?param=${userId}`); //구독
    eventSource.current.onopen = (event) => {
      console.log("connection opened");
    };

    eventSource.current.onmessage = (event) => {
      const sseMessage = JSON.parse(event.data);
      if (sseMessage.title === "CHAT") {
        content.current = JSON.parse(sseMessage.content);
        console.log("content: ", content.current);
        // setData((old) => [...old, event.data]);
        getSse();
      } else {
        console.log("it's not a chat");
      }
    };

    eventSource.current.onerror = (event) => {
      if (event.target.readyState === EventSource.CLOSED) {
        console.log("eventsource closed (" + event.target.readyState + ")");
      }
      eventSource.current.close();
    };
  };
  const getSse = async () => {
    let findIndex = chatLists.findIndex(
      (item) => item.id === content.current.id
    );

    // /* 새로운 변수를 선언해 기존의 배열을 복사하는 과정을 거쳐야 한다.
    // useState로 만든 변수는 set함수로만 값을 변경할 수 있기 때문이다. */

    if (findIndex === 0) {
      let copiedItems = [...chatLists];
      copiedItems[findIndex].text = content.current.lastMessage;
      copiedItems[findIndex].date = displayedAt(content.current.date);
      copiedItems[findIndex].cnt = Number(copiedItems[findIndex].cnt) + 1;
      setChatLists(copiedItems);
    } else if (findIndex >= 1) {
      const copiedItems = [...chatLists];
      const addChat = [
        {
          img: copiedItems[findIndex].img,
          username: copiedItems[findIndex].username,
          text: content.current.lastMessage,
          cnt: Number(copiedItems[findIndex].cnt) + 1,
          id: copiedItems[findIndex].id,
          date: displayedAt(content.current.date),
        },
      ];
      const deleteChatList = chatLists.filter(
        (item) => item.id !== content.current.id
      );

      const newChatList = [...addChat, ...deleteChatList];
      setChatLists(newChatList);
    } else {
      if (content.current != undefined) {
        const copiedItems = [...chatLists];
        try {
          const getChats = await Api.get(
            `http://20.214.170.222:8000/web-flux-service/api/v1/rooms/`,
            content.current
          );

          if (!getChats) {
            throw new Error(`${getChats} not allowd`);
          }
          let addChat = {};
          if (Number(getChats.data.houseId) === 0) {
            getChats.data.roomInfo.users.forEach(async (user) => {
              if (Number(user.userId) !== Number(userData.id)) {
                const getUserInfos = await Api.get(
                  `http://20.214.170.222:8000/user-service/api/v1/users/particular?param=`,
                  user.userId
                );
                if (!getUserInfos) {
                  throw new Error(`${user.userId} not allowd`);
                }
                addChat = {
                  img: getUserInfos.data.result[0].profileImgUrl,
                  username: getUserInfos.data.result[0].nickName,
                  text: content.current.lastMessage,
                  cnt: 1,
                  id: content.current.id,
                  date: displayedAt(content.current.date),
                };
              }
            });
          } else {
            addChat = {
              img: getChats.data.houseImg,
              username: getChats.data.roomName,
              text: content.current.lastMessage,
              cnt: 1,
              id: content.current.id,
              date: displayedAt(content.current.date),
            };
          }
          const newChatList = [addChat, ...chatLists];
          setChatLists(newChatList);
        } catch (e) {
          console.log("Error" + e);
        }
      }
    }
  };
  useEffect(() => {
    async function reactive() {
      await getChats();
      await connectSse();
    }
    reactive();
  }, []);
  // useEffect(async () => {
  //   // connectSse();
  //   // getChats();
  //   await getSse();
  // }, [data]);
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
                    <p style={{}}> {item.date}</p>
                  </div>
                  <div id="chat_text">
                    <p>{item.text}</p>
                    {Number(item.cnt) > 0 ? (
                      <StyledBadge badgeContent={item.cnt} color="error" />
                    ) : (
                      ""
                    )}
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
