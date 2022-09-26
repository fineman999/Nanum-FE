import React from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import HouseListItem from "./HouseListItem";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    title: "night",
  },
];

const HouseListSwiper = ({ title }) => {
  return (
    <Container sx={{ marginBottom: "120px", padding: "0px 30px 0px 30px" }}>
      <Typography
        variant="h5"
        mb={5}
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        {title}
      </Typography>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {itemData &&
          itemData.map((item, index) => (
            <SwiperSlide key={index}>
              <HouseListItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};

HouseListSwiper.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HouseListSwiper;
