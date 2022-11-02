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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageModal from "../../components/common/modal/ImageModal";
import { postS3 } from "../../lib/apis/image";
import FriendModal from "../../components/common/modal/FriendModal";

import WaveModal from "../../components/common/modal/WaveModal";
import { fireAlert } from "../../components/common/Alert";

const style = css`
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
    padding: 1rem;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: -webkit-fill-available;
  }
  #emoticon_form {
    /* background-color: #ffff; */
    padding: 0;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 90px;
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
    margin: 0rem 1rem;
  }
  #send_form input:focus {
    outline: none;
  }
`;

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [message, setMessage] = useState([]);
  const [count, setCount] = useState([]);
  const [sendMsg, setSendMsg] = useState(false);
  const userData = useRecoilState(userState);
  const messageBoxRef = useRef();
  const router = useRouter();
  const { id: roomNum } = router.query;
  const [init, setInit] = useState("");
  const [first, setFirst] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState();

  //modal 관리
  const [open, setOpen] = useState(false);
  const [freindOpen, setFreidnOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setImageSrc("");
  };
  const handleFreindOpen = () => {
    setFreidnOpen(false);
  };

  //채팅목록 젤  하단으로
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  let userId = userData[0].id;

  let ws = useRef(null);

  //소켓 열기
  const onOpen = async () => {
    console.log(userId, "userId", roomNum);
    // const uri = `wss://nanum.site/web-flux-service/chat?room=${roomNum}&userId=${userId}`;
    const uri = `wss://ssghot.shop/chat?room=${roomNum}&userId=${userId}`;
    ws.current = new WebSocket(uri);

    ws.current.onclose = (e) => {
      console.log("close", e);
    };
    ws.current.onerror = (e) => {
      console.log("error", e);
    };
    ws.current.onmessage = (e) => {
      let obj = JSON.parse(e.data);

      if (ws.current.readyState === 1) {
        if (obj.message.type == "IN") {
          /*고민 */
          setFirst(true);
          setInit(obj.message);
        } else {
          setMessage((prev) => [...prev, obj.message]);

          setCount((prev) => [
            ...prev,
            {
              users: obj.users.filter((user) => user != userId + ""),
            },
          ]);
        }
      }
    };

    ws.current.addEventListener("open", (event) => {
      if (ws.current.readyState === 1) {
        let obj = {
          sender: userData[0].id + "",
          message: userData[0].id + "",
          username: userData[0].nickName,
          type: "IN",
          createAt: new Date(),
          img: userData[0].profileImgUrl,
        };
        ws.current.send(JSON.stringify(obj));
      }
    });
    if (ws.current.readyState === 1) {
      ws.current.send(JSON.stringify(obj));
    }
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
  };

  //이미지 하나 s3에 보내고 소켓 이미지 보내기
  const sendS3 = () => {
    if (!imageFile) {
      fireAlert({ icon: "error", title: "이미지 입력" });
      return;
    }
    postS3({ imgFile: imageFile })
      .then((res) => {
        let obj = {
          sender: userData[0].id + "",
          message: res.data.result,
          username: userData[0].nickName,
          type: "IMAGE",
          createAt: new Date(),
          img: userData[0].profileImgUrl,
        };
        ws.current.send(JSON.stringify(obj));
        setSendMsg(!sendMsg);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // useEffect(() => {
  //   onOpen();
  //   // 어디 나갈때 닫아줘야됨
  //   return () => {
  //     ws.current.close();
  //     console.log("websocket closed");
  //   };
  // }, [ws]);
  useEffect(() => {
    async function reactive() {
      await onOpen();
    }
    reactive();
    // 어디 나갈때 닫아줘야됨

    if (!router.isReady) return;
    // console.log(roomNum, "🙆‍♀️ 콘솔에 쿼리 찍힘!");
    return () => {
      ws.current.close();
      console.log("websocket closed");
    };
  }, [router.isReady, ws]);

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  // 안 읽음 표시 업데이트
  useEffect(() => {
    if (first) {
      let comit = [];
      count.forEach((ele) => {
        // console.log("ele", ele.users);
        comit.push({ users: ele.users.filter((ix) => ix !== init.sender) });
      });
      setCount(comit);
    }
    setFirst(false);
  }, [init]);
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
                    type={m.type}
                    time={m.createAt}
                    count={
                      count[idx].users.length === 0
                        ? ""
                        : count[idx].users.length
                    }
                  />
                ) : (
                  <GetMessage
                    text={m.message}
                    type={m.type}
                    time={m.createAt}
                    nickName={m.username}
                    profileImgUrl={m.img}
                    count={
                      count[idx].users.length === 0
                        ? ""
                        : count[idx].users.length
                    }
                  />
                )}
              </div>
            ))}
        </section>
        <section id="emoticon_form">
          <WaveModal
            variant="outlined"
            sender={userData[0].id + ""}
            username={userData[0].nickName}
            img={userData[0].profileImgUrl}
            ws={ws}
          />

          {/* <LikeModal
            sender={userData[0].id + ""}
            username={userData[0].nickName}
            img={userData[0].profileImgUrl}
            ws={ws}
          /> */}
        </section>
        <section id="send_form">
          <IconButton variant="outlined" sx={{ height: "40px" }}>
            <AddPhotoAlternateIcon onClick={() => setOpen(true)} />
          </IconButton>
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
      <ImageModal
        open={open}
        handleClose={handleClose}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        setImageFile={setImageFile}
        sendS3={sendS3}
      />
      <FriendModal roomNum={roomNum} handleFreindOpen={handleFreindOpen} />
      {/* <LikeModal
        sender={userData[0].id + ""}
        username={userData[0].nickName}
        img={userData[0].profileImgUrl}
        ws={ws}
      /> */}
      {/* <WaveModal
        sender={userData[0].id + ""}
        username={userData[0].nickName}
        img={userData[0].profileImgUrl}
        ws={ws}
      /> */}
      <style jsx>{style}</style>
    </>
  );
}
