import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper";
import styles from "../styles/MainSwiper.module.css";

const itemData = [
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_1.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_2.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_3.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_4.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_5.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_6.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_7.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_8.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_9.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_10.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_11.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_12.jpg",
  },
  {
    img: "https://nanumbucket.s3.ap-northeast-2.amazonaws.com/mainPage/house_image_13.jpg",
  },
];

const MainSwiper = () => {
  return (
    <div className={styles.main_swiper_wrapper}>
      <Swiper
        effect={"fade"}
        speed={1000}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        fadeEffect={{ crossFade: true }}
        modules={[EffectFade, Autoplay]}
        style={{ zIndex: 0 }}
      >
        {itemData &&
          itemData.map((item, index) => {
            return (
              <SwiperSlide key={index} className="swiperImage">
                <div
                  style={{
                    width: "100%",
                    height: "460px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundImage: `url(${item.img})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {/* <MainMessage /> */}
    </div>
  );
};

export default MainSwiper;
