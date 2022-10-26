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

export default function BoardModal({ open, handleClose, images, date }) {
  const swiperRef = useRef(null);
  const router = useRouter();

  const handleModal = () => {
    handleClose();
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
            <p>날짜: {handleDate(date)}</p>
          </div>

          {images && images.length > 0 ? (
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
              {images &&
                images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="house_image_wrapper">
                      <Image
                        src={image.imgUrl}
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
          {<OneButton text1="닫기" handleBtn1={handleModal} type="0" />}
        </Box>
      </Modal>
      <style jsx>{mystyle}</style>
    </div>
  );
}
