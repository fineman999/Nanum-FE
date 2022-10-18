import Header from "../../components/common/Header";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import css from "styled-jsx/css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProfileImg } from "../../components/common/Profile";
import { getSessionId ,displayedAt} from "../../lib/utils/useful-functions";
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
  const [data, setData] = useState([]);
  const router = useRouter();
  const goChat = (id) => {
    router.push(`/chat/${id}`);
  };
  const getChats = async () => {
    // setChatLists([]);
    const userId = getSessionId();
    console.log("userid",userId)
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

      chats2.forEach((ele) => {
        let chat = {};
        console.log(ele);
        const userInfo = ele.roomInfo;

        // 두명
        if (ele.houseId == 0) {
          console.log(ele.houseId);
          userInfo.users.forEach((user) => {
            getUserInfos.data.result.forEach((i,x) => {
              if (user.userId == i.id && i.id != userId) {
                chat = {
                  img: i.profileImgUrl,
                  username: i.nickName,
                  text: `${
                    userInfo.lastMessage === null ? "" : userInfo.lastMessage
                  }`,
                  id: ele.id,
                  date: ele.updateAt,
                  cnt: `${
                    userInfo.users[0].userId == userId ? userInfo.users[0].readCount : userInfo.users[1].readCount
                  }`
                };
              }
            });
          });
        } else if (ele.houseId != 0) {
          // 채팅 방
           userInfo.users.forEach((user) => {
            if(user.userId == userId){
              chat = {
                img: ele.houseImg,
                username: ele.roomName,
                text: `${
                  userInfo.lastMessage == null ? "" : userInfo.lastMessage
                }`,
                cnt: `${
                  user.readCount
                }`,
                id:ele.id,
                date:ele.updateAt,

              };
            }
            });
        }
        setChatLists((prev) => [...prev, chat]);
      });
    } catch (e) {
      console.log("Error" + e);
    }
  };
const connectSse = async () =>{
  const userId = getSessionId();
  // const  eventSource = new EventSource(`http://20.214.170.222:8000/web-flux-service/api/v1/alerts/users?param=${userId}`); //구독
  const  eventSource = new EventSource(`http://localhost:8080/api/v1/alerts/users?param=${userId}`); //구독
  console.log("eventSource", eventSource);

  eventSource.onopen = event => {
    console.log("connection opened");
  };

  eventSource.onmessage = event => {
    console.log("result", event.data);
    const data = JSON.parse(event.data);
    const content = JSON.parse(data.content);
    console.log(data)
    console.log(JSON.parse(data.content))
    console.log(chatLists)
    // 1. 해당 값 찾고
    const result = chatLists.find(item=>item.id==content.id);
    console.log("resut",result)
    // 2. 기존의 값 복사하고 
    const removeCopiedChatLists= [...chatLists];

    // 3. 해당 값 삭제하고
   const copiedChatLists = removeCopiedChatLists.filter(item=>item.id!=content.id);
    
    // result.date = content.date;
    // result.cnt +=1;
    // result.text = content.lastMessage;
    // let newObject = [];
    // newObject.push(result);
    // newObject.concat(copiedChatLists);
    // console.log("didid");
    // console.log(copiedChatLists);
    setData(old => [...old, event.data]);
    // setChatLists(newObject);
  };

  eventSource.onerror = event => {
    console.log(event.target.readyState);
    if (event.target.readyState === EventSource.CLOSED) {
      console.log("eventsource closed (" + event.target.readyState + ")");
    }
    eventSource.close();
  };
  return () => {
    eventSource.close();
  };
}
  useEffect(() => {
    getChats();   
  }, []);
  useEffect(() => {
    connectSse();  
    // getChats();  
  }, [data]);
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
                    <p> {displayedAt(item.date)}</p>
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
