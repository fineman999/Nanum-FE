import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper";
import styles from "../styles/MainSwiper.module.css";

const itemData = [
  {
    img: "/images/house_image_1.jpg",
    title: "Bed",
  },
  {
    img: "/images/house_image_2.jpg",
    title: "Books",
  },
  {
    img: "/images/house_image_3.jpg",
    title: "Sink",
  },
  {
    img: "/images/house_image_4.jpg",
    title: "Kitchen",
  },
  {
    img: "/images/house_image_5.jpg",
    title: "Blinds",
  },
  {
    img: "/images/house_image_6.jpg",
    title: "Chairs",
  },
  {
    img: "/images/house_image_7.jpg",
    title: "Laptop",
  },
  {
    img: "/images/house_image_8.jpg",
    title: "Doors",
  },
  {
    img: "/images/house_image_9.jpg",
    title: "Coffee",
  },
  {
    img: "/images/house_image_10.jpg",
    title: "Storage",
  },
  {
    img: "/images/house_image_11.jpg",
    title: "Candle",
  },
  {
    img: "/images/house_image_12.jpg",
    title: "Coffee table",
  },
  {
    img: "/images/house_image_13.jpg",
    title: "night",
  },
];

const MainMessage = () => {
  return (
    <div className={styles.main_message}>
      <div className={styles.main_message_center}>
        <h2 className={styles.main_center_title}>
          너 빼고
          <br />다 살고 있음
        </h2>

        <h4 className={styles.main_left_message}>나눔이</h4>
        <h4 className={styles.main_right_message}>답이다</h4>
      </div>
    </div>
  );
};

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
                    height: "560px",
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
      <MainMessage />
    </div>
  );
};

export default MainSwiper;
