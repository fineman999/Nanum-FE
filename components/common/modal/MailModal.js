import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import css from "styled-jsx/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination, Navigation } from "swiper";
import { TwoButtonOption, OneButton } from "../Button";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";
import { useRouter } from "next/router";
import { ProfileImg } from "../Profile";
import { useState } from "react";
import { useEffect } from "react";
import { getMailDetail } from "../../../lib/apis/mail";
const mystyle = css`
  .house_image_wrapper {
    height: 30vh;
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
const mail = {
  note: {
    id: 8,
    title: "title",
    content: "ㅗㅑㅗ",
    senderId: 1,
    receiverId: 3,
    receiver: {
      email: "saros@gmail.com",
      nickName: "아거나 적줘여",
      phone: "0102365255",
      createAt: "2022-10-07T04:56:19",
      noteReject: true,
    },
    sender: {
      email: "spharos@gmail.com",
      nickName: "아거나 적어줘여",
      phone: "0109665255",
      createAt: "2022-10-07T02:26:57",
      noteReject: true,
    },
    createAt: "2022-10-11T05:31:23",
  },
  noteImgList: [
    {
      originName: "test.PNG",
      savedName: "599c48eb-442a-49cb-96f2-6aaccad82434-test.PNG",
      imgPath:
        "https://nanum.s3.ap-northeast-2.amazonaws.com/599c48eb-442a-49cb-96f2-6aaccad82434-test.PNG",
    },
    {
      originName: "네이버 로그인.PNG",
      savedName: "3ab31f11-c605-4f68-a7ad-cee72ef129d0-네이버 로그인.PNG",
      imgPath:
        "https://nanum.s3.ap-northeast-2.amazonaws.com/3ab31f11-c605-4f68-a7ad-cee72ef129d0-%EB%84%A4%EC%9D%B4%EB%B2%84%20%EB%A1%9C%EA%B7%B8%EC%9D%B8.PNG",
    },
  ],
};
export default function MailModal({ open, handleClose, isType, noteId }) {
  const swiperRef = useRef(null);
  const router = useRouter();
  const handleModal = () => {
    handleClose();
  };

  const handleSend = () => {
    router.push(
      {
        pathname: "/mail/send",
        query: { name: mail.note.receiver.nickName },
      },
      "/mail/send"
    );
  };

  const handleDate = (str) => {
    const date = new Date(str);
    return date.toLocaleDateString();
  };

  // useEffect(() => {
  //   getMailDetail(noteId)
  //     .then((res) => {
  //       console.log(res.data.note, "ss");
  //       setTest(res.data);
  //     })
  //     .catch((err) => console.log(err, "mail"));
  // }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isType == 1 ? "보낸 사람" : "받는 사람"}
            </Typography>
            <p>날짜: {handleDate(mail.note.createAt)}</p>
            <p>dkg:{noteId}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <ProfileImg img={mail.profile} size={4} name={mail.name} type={1} /> */}
            {mail.note.receiver.nickName}
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ marginBottom: "0.5rem" }}
          >
            {mail.note.content}
          </Typography>

          {mail.noteImgList.length > 0 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                type: "fraction",
                clickable: true,
              }}
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              style={{
                "--swiper-navigation-color": "#fff",
              }}
              ref={swiperRef}
            >
              {mail.noteImgList &&
                mail.noteImgList.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="house_image_wrapper">
                      <Image
                        src={image.imgPath}
                        alt="temp"
                        layout="fill"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <></>
          )}
          {isType == 1 ? (
            <TwoButtonOption
              text1="답장보내기"
              text2="닫기"
              handleBtn1={handleSend}
              handleBtn2={handleModal}
            />
          ) : (
            <OneButton text1="닫기" handleBtn1={handleModal} type="0" />
          )}
        </Box>
      </Modal>
      <style jsx>{mystyle}</style>
    </div>
  );
}
