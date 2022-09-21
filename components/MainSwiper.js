import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper";

const imageList = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1602075432748-82d264e2b463?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
];

const MainSwiper = () => {
  return (
    <Swiper
      effect={"fade"}
      speed={1000}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      fadeEffect={{ crossFade: true }}
      modules={[EffectFade, Autoplay]}
    >
      {imageList.map((listItem, index) => {
        return (
          <SwiperSlide
            key={index}
            className="swiperImage"
            style={{
              width: "100%",
              height: "560px",
              backgroundImage: `url(${listItem})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MainSwiper;
