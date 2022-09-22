import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper";
import { fontWeight } from "@mui/system";

const imageList = ["red", "blue", "green"];

const MainSwiper = () => {
  return (
    <Swiper
      effect={"fade"}
      speed={1000}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      loop={true}
      fadeEffect={{ crossFade: true }}
      modules={[EffectFade, Autoplay]}
      style={{ zIndex: 0 }}
    >
      {imageList.map((listItem, index) => {
        return (
          <SwiperSlide key={index} className="swiperImage">
            <div
              style={{
                width: "100%",
                height: "560px",
                background: `${listItem}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ color: "white", fontWeight: "bold" }}>
                HOUSE IMAGE {index}
              </span>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MainSwiper;
