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

export default function MailModal({ open, handleClose, mail, isType }) {
  const swiperRef = useRef(null);
  const router = useRouter();
  const handleModal = () => {
    handleClose();
  };
  const handleSend = () => {
    router.push(
      {
        pathname: "/mail/send",
        query: { name: mail.name },
      },
      "/mail/send"
    );
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
            <p>날짜: {mail.date}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ProfileImg img={mail.profile} size={4} name={mail.name} type={1} />
            {mail.name}
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ marginBottom: "0.5rem" }}
          >
            {mail.text}
          </Typography>

          {mail.img.length > 0 ? (
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
              {mail.img &&
                mail.img.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="house_image_wrapper">
                      {/* <img src={image} /> */}
                      <Image src={image} alt="temp" layout="fill" priority />
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
