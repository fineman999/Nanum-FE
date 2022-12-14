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

export default function MailModal({ open, handleClose, isType, mail }) {
  const swiperRef = useRef(null);
  const router = useRouter();

  const handleModal = () => {
    handleClose();
  };

  const handleSend = () => {
    router.push(
      {
        pathname: "/mail/send",
        query: {
          name: mail.note.sender.nickName,
          receiverId: mail.note.senderId,
          senderId: mail.note.receiverId,
        },
      },
      "/mail/send"
    );
  };

  const handleDate = (str) => {
    const date = new Date(str);
    return date.toLocaleDateString();
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
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ProfileImg
              img={
                isType == 1
                  ? mail.note.sender.profileImgUrl
                  : mail.note.receiver.profileImgUrl
              }
              size={4}
              name={
                isType == 1
                  ? mail.note.sender.nickName
                  : mail.note.receiver.nickName
              }
              type={1}
              id={isType == 1 ? mail.note.senderId : mail.note.receiverId}
            />
            {isType == 1 ? (
              <p style={{ marginLeft: "0.5rem" }}>
                {mail.note.sender.nickName}
              </p>
            ) : (
              <p style={{ marginLeft: "0.5rem" }}>
                {mail.note.receiver.nickName}
              </p>
            )}
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
