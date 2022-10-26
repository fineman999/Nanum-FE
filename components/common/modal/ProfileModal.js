import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import css from "styled-jsx/css";
import { OneButton, TwoButtonOption } from "../Button";
import CloseIcon from "@mui/icons-material/Close";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { postBlock } from "../../../lib/apis/block";
import { useRecoilValue } from "recoil";
import { userState } from "../../../state/atom/authState";
import { fireAlert } from "../Alert";
import { useRouter } from "next/router";
import { getChat } from "../../../lib/apis/chat";
import { useEffect } from "react";

const mystyle = css`
  .house_image_wrapper {
    height: 30vh;
  }
  img {
    width: 10vh;
    height: 10vh;
    border-radius: 100%;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "300px",
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

//type:1 쪽지함에서 열리는거
//type:2 채팅창에서 열리는거

export default function ProfileModal({
  open,
  handleClose,
  img,
  name,
  type,
  id,
  roomNum,
}) {
  const userData = useRecoilValue(userState);
  const router = useRouter();
  const blockerId = userData.id;
  const blockedUserId = id;

  const goChat = () => {
    router.push(`/chat/${roomNum}`);
  };
  const handleSend = () => {
    router.push(
      {
        pathname: "/mail/send",
        query: {
          name: name,
          receiverId: id,
          senderId: userData.id,
        },
      },
      "/mail/send"
    );
  };
  const goBlock = () => {
    postBlock({ blockerId, blockedUserId })
      .then((res) => {
        console.log(res);
        router.push("/mypage/block");
        setTimeout(() => {
          if (res.status == 201) {
            fireAlert({ title: "차단했습니다.", icon: "success" });
          }
          if (res.status == 208) {
            fireAlert({
              title: "이미 차단등록된 사용자입니다.",
              icon: "warning",
            });
          }
        }, 200);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div onClick={handleClose}>
            <CloseIcon style={{ position: "fixed", right: "2rem" }} />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <img src={img} />
            </div>
            <p style={{ textAlign: "center" }}>{name}</p>
          </Typography>
          {type == 1 ? (
            <TwoButtonOption
              text1="채팅하기"
              text2="차단하기"
              handleBtn1={goChat}
              handleBtn2={goBlock}
            />
          ) : type == 3 ? (
            <OneButton
              text1="본인 프로필 입니다."
              handleBtn1={handleClose}
              type={1}
            />
          ) : (
            <TwoButtonOption
              text1="쪽지보내기"
              text2="차단하기"
              handleBtn1={handleSend}
              handleBtn2={goBlock}
            />
          )}
        </Box>
      </Modal>
      <style jsx>{mystyle}</style>
    </div>
  );
}
