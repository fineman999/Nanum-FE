import React from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import HouseListItem from "./HouseListItem";

const itemData = [
  {
    img: "/images/house_image_1.jpg",
    name: "Bed",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스],
  },
  {
    img: "/images/house_image_2.jpg",
    name: "Books",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_3.jpg",
    name: "Sink",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_4.jpg",
    name: "Kitchen",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_5.jpg",
    name: "Blinds",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_6.jpg",
    name: "Chairs",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_7.jpg",
    name: "Laptop",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_8.jpg",
    name: "Doors",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_9.jpg",
    name: "Coffee",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_10.jpg",
    name: "Storage",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_11.jpg",
    name: "Candle",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_12.jpg",
    name: "Coffee table",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "/images/house_image_13.jpg",
    name: "night",
    islike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
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
          itemData.map((listItem) => (
            <SwiperSlide key={listItem.id}>
              <HouseListItem listItem={listItem} />
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
