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
import { DeleteRounded } from "@mui/icons-material";
import { confirmAlert } from "../../components/common/Alert";
import axios from "axios";

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
  const router = useRouter();
  const userData = useRecoilValue(userState);
  let eventSource = useRef(null);
  const [listening, setListening] = useState(false);
  const [deleteState, setDeleteState] = useState(true);
  const goChat = (id) => {
    router.push(`/chat/${id}`);
  };
  const getChats = async (cancelToken) => {
    // setChatLists([]);
    try {
      const getChatLists = await Api.getCancelToken(
        `http://20.214.170.222:8000/web-flux-service/api/v1/rooms/users/`,
        userData.id,
        cancelToken
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
      const getUserInfos = await Api.getCancelToken(
        `http://20.214.170.222:8000/user-service/api/v1/users/particular?param=`,
        findUserInfos,
        cancelToken
      );

      const chats2 = getChatLists.data;

      chats2.forEach((ele) => {
        let chat = {};

        const userInfo = ele.roomInfo;
        if (userInfo.users.length <= 1) {
          chat = {
            img: "/images/default.png",
            username: "알수없음",
            text: `${
              userInfo.lastMessage === null ? "" : userInfo.lastMessage
            }`,
            id: ele.id,
            date: displayedAt(ele.updateAt),
            cnt: `${
              userInfo.users[0].userId == userData.id
                ? userInfo.users[0].readCount
                : 0
            }`,
          };
        } else {
          // 두명
          if (ele.houseId == 0) {
            userInfo.users.forEach((user) => {
              getUserInfos.data.result.forEach((i, x) => {
                if (user.userId == i.id && i.id != userData.id) {
                  chat = {
                    img: i.profileImgUrl,
                    username: i.nickName,
                    text: `${
                      userInfo.lastMessage === null ? "" : userInfo.lastMessage
                    }`,
                    id: ele.id,
                    date: displayedAt(ele.updateAt),
                    cnt: `${
                      userInfo.users[0].userId == userData.id
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
              if (user.userId == userData.id) {
                chat = {
                  img: ele.houseImg,
                  username: ele.roomName,
                  text: `${
                    userInfo.lastMessage == null ? "" : userInfo.lastMessage
                  }`,
                  cnt: `${user.readCount}`,
                  id: ele.id,
                  date: displayedAt(ele.updateAt),
                };
              }
            });
          }
        }
        setChatLists((prev) => [...prev, chat]);
      });
    } catch (e) {
      console.log("Error" + e);
    }
  };

  const getSse = async (cancelToken) => {
    if (content.current === undefined) {
      return;
    }
    let findIndex = chatLists.findIndex(
      (item) => item.id === content.current.id
    );

    if (findIndex === 0) {
      let copiedItems = [...chatLists];
      copiedItems[findIndex].text = content.current.lastMessage;
      copiedItems[findIndex].date = displayedASpringMVC(content.current.date);
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
          date: displayedASpringMVC(content.current.date),
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
          const getChats = await Api.getCancelToken(
            `http://20.214.170.222:8000/web-flux-service/api/v1/rooms/`,
            content.current.id,
            cancelToken
          );

          if (!getChats) {
            throw new Error(`${getChats} not allowd`);
          }
          let addChat = {};
          if (Number(getChats.data.houseId) === 0) {
            getChats.data.roomInfo.users.forEach(async (user) => {
              if (Number(user.userId) !== Number(getSessionId())) {
                const getUserInfos = await Api.getCancelToken(
                  `http://20.214.170.222:8000/user-service/api/v1/users/particular?param=`,
                  user.userId,
                  cancelToken
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
                  date: displayedASpringMVC(content.current.date),
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
              date: displayedASpringMVC(content.current.date),
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
    const cancleToken = axios.CancelToken.source();
    async function reactive() {
      await getChats(cancleToken);
    }
    reactive();
    if (!listening) {
      eventSource.current = new EventSource(
        `http://20.214.170.222:8000/web-flux-service/api/v1/alerts/users?param=${userData.id}`
      ); //구독
      // const  eventSource = new EventSource(`http://localhost:8080/api/v1/alerts/users?param=${userId}`); //구독

      eventSource.current.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.current.onmessage = async (event) => {
        const sseMessage = JSON.parse(event.data);
        if (sseMessage.title === "CHAT") {
          content.current = JSON.parse(sseMessage.content);
          setData((old) => [...old, event.data]);
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
    return () => {
      eventSource.current.close();

      cancleToken.cancel();
    };
    // getChats();
    // connectSse();
  }, []);
  useEffect(() => {
    const cancleToken = axios.CancelToken.source();
    // connectSse();
    // getChats();
    async function reactive() {
      await getSse(cancleToken);
    }
    reactive();
    // getSse()

    return () => {
      cancleToken.cancel();
    };
  }, [data]);

  const deletedEvent = (roomId, userId, username) => {
    if (deleteState) console.log(roomId + " :::" + userId);
    const sendAlert = {
      icon: "warning",
      title: username,
      text: "해당 채팅을 삭제하겠습니까?",
      successText: "성공하였습니다.",
    };
    confirmAlert(sendAlert)
      .then(async (result) => {
        if (result) {
          try {
            if (deleteState) {
              setDeleteState(false);
              const chatDeleteResult = await Api.delete(
                `http://20.214.170.222:8000/web-flux-service/api/v1/rooms/${roomId}/users/${userId}`,
                ""
              );

              setChatLists(chatLists.filter((item) => item.id !== roomId));
            }
          } catch (e) {
            console.log("error", e);
          }
          setDeleteState(true);
        }
      })
      .catch((res) => {
        console.log(`${res} 에러가 발생하였습니다.`);
      });
  };
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
                      <StyledBadge
                        badgeContent={Number(item.cnt)}
                        color="error"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {isUpdate && (
                  <>
                    <div
                      id="delete_btn"
                      onClick={(e) => {
                        deletedEvent(item.id, userData.id, item.username);
                      }}
                    >
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
