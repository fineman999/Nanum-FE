import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import css from "styled-jsx/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination, Navigation } from "swiper";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";
const mystyle = css`
  #btn_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    width: 100%;
    margin: 1rem 0.2rem;
  }
  #back_to_btn {
    background-color: #777777;
  }
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
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function MailModal({ open, handleClose, mail }) {
  const swiperRef = useRef(null);

  const handleModal = () => {
    handleClose();
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
              보낸사람:{mail.name}
            </Typography>
            <p>날짜: {mail.date}</p>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
          <div id="btn_list">
            <button>답장보내기</button>
            <button id="back_to_btn" onClick={handleModal}>
              닫기
            </button>
          </div>
        </Box>
      </Modal>
      <style jsx>{mystyle}</style>
    </div>
  );
}
