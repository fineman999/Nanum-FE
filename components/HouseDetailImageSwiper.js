import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

const HouseDetailImageSwiper = ({ houseImages }) => {
  return (
    <>
      <Swiper
        initialSlide={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          "--swiper-navigation-color": "#fff",
        }}
      >
        {houseImages &&
          houseImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="house_image_wrapper">
                <Image
                  src={image.imgPath}
                  alt="house_main_image"
                  layout="fill"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <style jsx>{`
        .house_image_wrapper {
          position: relative;
          width: 100%;
          height: 320px;
        }
      `}</style>
    </>
  );
};

export default HouseDetailImageSwiper;
