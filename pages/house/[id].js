import { Button, Divider, IconButton, Toolbar } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../components/common/Footer";
import SubHeader from "../../components/common/SubHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useRef, useState } from "react";
import { pink } from "@mui/material/colors";
import { Favorite } from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

const houseData = {
  images: [
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
    "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20",
    "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198",
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da",
    "https://images.unsplash.com/photo-1560185009-dddeb820c7b7",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  ],
};

const House = () => {
  const [like, setLike] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    console.log(swiperRef);
  }, []);

  const handleLike = () => {
    setLike(!like);
  };

  const MoveToAnchor = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Head>
        <title>하우스 상세 페이지</title>
      </Head>
      <SubHeader title="하우스 상세" type="detail" />

      <section className="house_body_section">
        {/* 하우스 이미지 리스트 */}
        <div className="house_image_container">
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
            {houseData.images &&
              houseData.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="house_image_wrapper">
                    <Image src={image} alt="temp" layout="fill" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          {/* 좋아요 버튼 */}
          <div className="like_wrapper">
            <IconButton onClick={handleLike}>
              {like ? (
                <Favorite sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: pink[500] }} />
              )}
              <span className="like_text">좋아요</span>
            </IconButton>
          </div>
        </div>

        {/* 하우스 메뉴, 소개, 방 정보, 상세정보, 리뷰 */}
        <div className="house_body_contents">
          {/* 하우스 메뉴 */}

          <div className="house_top_menu">
            <Toolbar />
            <ul className="top_menu_list">
              <li>
                <Button
                  onClick={MoveToAnchor}
                  sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
                >
                  소개
                </Button>
              </li>
              <li>
                <Button
                  onClick={MoveToAnchor}
                  sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
                >
                  방정보
                </Button>
              </li>
              <li>
                <Button
                  onClick={MoveToAnchor}
                  sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
                >
                  상세정보
                </Button>
              </li>
              <li>
                <Button
                  onClick={MoveToAnchor}
                  sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
                >
                  리뷰(100)
                </Button>
              </li>
            </ul>
            <Divider />
          </div>

          {/* 하우스 소개 */}
          <div id="house_intro" className="house_intro_wrapper">
            <h2>소개</h2>
            <p>살고싶어요~</p>
          </div>

          {/* 하우스 방 정보 */}
          <div id="house_room" className="house_room_info_wrapper">
            <div className="house_room_info_header">
              <h1>방 정보</h1>
            </div>
          </div>

          {/* 하우스 상세 정보 */}
          <div id="house_detail" className="house_detail_info_wrapper">
            <div className="house_detail_info_header">
              <h1>상세 정보</h1>
            </div>
            <div className="house_room_map_wrapper"></div>
          </div>

          {/* 하우스 리뷰 정보 */}
          <div id="house_review" className="house_review_wrapper">
            <div className="house_review_header">
              <h1>리뷰</h1>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* 하우스 툴바 */}
      <div className="house_toolbar_container">
        <Divider />
        <div className="toolbar_wrapper">
          <div className="toolbar_ico_like_wrapper">
            <IconButton onClick={handleLike}>
              {like ? (
                <Favorite sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: pink[500] }} />
              )}
            </IconButton>
          </div>
          <div className="toolbar_info_wrapper">
            <h3>부산광역시 해운대구 우동 1514 센텀리더스마크 401호</h3>
          </div>
          <div className="house_toolbar_btns">
            <div className="btn_call">
              <IconButton>
                <CallIcon />
                <span className="btn_text">전화문의</span>
              </IconButton>
            </div>
            <div className="btn_reg">
              <IconButton>
                <HowToRegIcon />
                <span className="btn_text">투어신청</span>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .house_image_container {
          position: relative;
        }

        .house_body_section {
          width: 100%;
        }

        .house_image_wrapper {
          position: relative;
          width: 100%;
          height: 320px;
        }

        .like_wrapper {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 100;

          background: #ffffff;
          border-radius: 20px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .like_text {
          font-size: 16px;
          font-weight: bold;
          margin-left: 3px;
        }

        .house_top_menu {
          position: sticky;
          width: 100%;
          margin-bottom: 20px;
          top: 0;
          left: 0;
        }

        .top_menu_list {
          display: flex;
          align-items: center;
          width: 100%;
          height: 64px;
          background: white;
        }

        .top_menu_list li {
          flex: 1;
          text-align: center;
          font-weight: bold;
          cursor: pointer;
        }

        .house_intro_wrapper {
          background: white;
          margin-bottom: 20px;
          height: 500px;
        }

        .house_room_info_wrapper {
          background: white;
          margin-bottom: 20px;
          height: 1000px;
        }

        .house_detail_info_wrapper {
          background: white;
          margin-bottom: 20px;
          height: 600px;
        }

        .house_review_wrapper {
          background: white;
          margin-bottom: 20px;
          height: 600px;
        }

        .house_toolbar_container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background: white;
        }

        .toolbar_ico_like_wrapper {
          text-align: center;
          flex: 1;
        }
        .toolbar_wrapper {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .toolbar_info_wrapper {
          font-size: 0.7em;
          flex: 3;
        }
        .house_toolbar_btns {
          display: flex;
          flex: 4;
        }

        .btn_text {
          font-size: 0.7em;
        }

        // 미디어 쿼리
        @media all (min-width: 1024px) {
          .house_body_section {
            width: 1200px;
            margin: 0 auto;
          }

          .house_image_wrapper {
            height: 500px;
          }

          .house_toolbar_container {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default House;
