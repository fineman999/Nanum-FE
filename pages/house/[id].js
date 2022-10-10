import { Button, Divider, IconButton, Toolbar } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../components/common/Footer";
import SubHeader from "../../components/common/SubHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRef, useState } from "react";
import { pink } from "@mui/material/colors";
import { Favorite } from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Pagination, Navigation } from "swiper";

import "swiper/css/pagination";
import "swiper/css/navigation";
import HouseRoomItem from "../../components/HouseRoomItem";
import HouseNearInfo from "../../components/HouseNearInfo";
import HouseReviewList from "../../components/HouseReviewList";

const houseData = {
  name: "나눔101호",
  images: [
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
    "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20",
    "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198",
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da",
    "https://images.unsplash.com/photo-1560185009-dddeb820c7b7",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  ],
  desc: `자바스크립트(영어: JavaScript)는 객체 기반의 스크립트 프로그래밍
  언어이다. 이 언어는 웹 브라우저 내에서 주로 사용되며, 다른 응용
  프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있다. 또한
  Node.js와 같은 런타임 환경과 같이 서버 프로그래밍에도 사용되고
  있다. 자바스크립트는 본래 넷스케이프 커뮤니케이션즈 코퍼레이션의
  브렌던 아이크(Brendan Eich)가 처음에는 모카(Mocha)라는 이름으로,
  나중에는 라이브스크립트(LiveScript)라는 이름으로 개발하였으며,
  최종적으로 자바스크립트가 되었다. 자바스크립트가 썬
  마이크로시스템즈의 자바와 구문이 유사한 점도 있지만, 이는 사실 두
  언어 모두 C 언어의 기본 구문에 바탕을 뒀기 때문이고, 자바와
  자바스크립트는 직접적인 연관성은 약하다. 이름과 구문 외에는
  자바보다 셀프나 스킴과 유사성이 많다. 자바스크립트는
  ECMA스크립트(ECMAScript)의 표준 사양을 가장 잘 구현한 언어로
  인정받고 있으며 ECMAScript 5(ES5)까지는 대부분의 브라우저에서
  기본적으로 지원되었으나 ECMAScript 6 이후부터는 브라우저 호환성을
  위해 트랜스파일러로 컴파일된다.[4]`,
};

const House = () => {
  const [like, setLike] = useState(false);
  const [descMore, setDescMore] = useState(false);
  const swiperRef = useRef(null);

  const handleLike = () => {
    setLike(!like);
  };

  const MoveToAnchor = (event, target) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      target
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
        <div className="house_body_top">
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
                      <Image src={image} alt="temp" layout="fill" priority />
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
        </div>

        {/* 하우스 메뉴, 소개, 방 정보, 상세정보, 리뷰 */}
        <div className="house_body_contents">
          {/* 하우스 메뉴 */}
          <div className="house_top_menu">
            <Toolbar />
            <ul className="top_menu_list">
              <li>
                <Button
                  onClick={(event) => MoveToAnchor(event, "#house_intro")}
                  sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
                >
                  소개
                </Button>
              </li>
              <li>
                <Button
                  onClick={(event) => MoveToAnchor(event, "#house_room")}
                  sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
                >
                  방정보
                </Button>
              </li>
              <li>
                <Button
                  onClick={(event) => MoveToAnchor(event, "#house_detail")}
                  sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
                >
                  주변정보
                </Button>
              </li>
              <li>
                <Button
                  onClick={(event) => MoveToAnchor(event, "#house_review")}
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
            <div className="house_info_header">
              <h2>소개</h2>
            </div>
            <div className="house_desc_wrapper">
              {descMore ? (
                <p>{houseData.desc}</p>
              ) : (
                <p>{houseData.desc.slice(0, 100)}...</p>
              )}
            </div>
            <div className="more_btn_wrapper">
              <Button onClick={() => setDescMore(!descMore)}>
                {descMore ? "접기" : "더보기"}
              </Button>
            </div>
          </div>

          {/* 하우스 방 정보 */}
          <div id="house_room" className="house_room_info_wrapper">
            <div className="house_info_header">
              <h2>방 정보</h2>
            </div>
            <div className="room_map">
              <div className="room_map_preparing">
                <h1 className="">준비중</h1>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1497217968520-7d8d60b7bc25"
                alt="temp"
                layout="fill"
                priority
              />
            </div>
            <div className="room_list">
              <HouseRoomItem />
              <HouseRoomItem />
              <HouseRoomItem />
              <HouseRoomItem />
            </div>
            <div className="room_notice">
              - 미성년자 또는 41세 이상, 회원 가입시 개인정보가 계약자와 다를
              경우 입주 불가능
              <br /> - 운영관리비와 선불공과금은 매월 별도 납부 함 [자세히
              알아보기]
              <br /> - 입주신은 두 지점까지 가능 - 입주신청은 입주가능일 45일
              전부터 가능
              <br /> - 입주가능알림 신청 후 입주가 가능해질 때 입주신청가능으로
              SMS 자동문자 발송
              <br /> - 나눔의 하우스는 반전세 적용이 가능합니다. (보증금
              1,000만원 상향 시 월세 5만원 할인)
              <br /> - 경우에 따라 반전세 적용이 불가한 하우스도 있으니 반드시
              확인 부탁드립니다. [자세히 알아보기]
            </div>
          </div>

          {/* 하우스 주변 정보 */}
          <div id="house_detail" className="house_detail_info_wrapper">
            <div className="house_info_header">
              <h2>주변 정보</h2>
            </div>
            <HouseNearInfo />
          </div>
          {/* 하우스 리뷰 정보 */}
          <div id="house_review" className="house_review_wrapper">
            <div className="house_info_header">
              <h2>리뷰</h2>
            </div>
            <HouseReviewList />
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
            <h2 className="house_name">나눔101</h2>
            <span className="house_address">부산시 해운대구 우동</span>
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
        .house_body_section {
          position: relative;
          width: 100%;
        }

        .house_body_top {
          position: relative;
          width: 100%;
          height: 264px;
        }

        .house_image_container {
          position: absolute;
          top: 0;
          left: 0;
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
          z-index: 1000;
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

        // 하우스 상세 정보
        // 하우스 소개
        .house_intro_wrapper {
          background: white;
          margin-bottom: 20px;

          box-sizing: border-box;
          padding: 0px 20px 0px 20px;
        }

        .house_room_info_wrapper {
          background: white;
          margin-bottom: 20px;
          padding: 0px 20px 20px 20px;
        }

        .room_map {
          position: relative;
          width: 100%;
          height: 300px;
          margin-bottom: 20px;
        }

        .room_map_preparing {
          position: absolute;
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 10;
          backdrop-filter: blur(5px);
        }

        .room_list {
          margin-bottom: 20px;
        }

        .room_notice {
          font-size: 0.5em;
        }

        .house_toolbar_container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background: white;
          z-index: 100;
        }

        .house_detail_info_wrapper {
          background: white;
          margin-bottom: 20px;
        }

        .house_review_wrapper {
          background: white;
          margin-bottom: 20px;
        }

        .house_info_header {
          box-sizing: border-box;
          padding: 20px;
        }

        .toolbar_ico_like_wrapper {
          text-align: center;
          flex: 1;
        }

        .toolbar_wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        .toolbar_info_wrapper {
          font-size: 0.7em;
          flex: 3;
        }

        .toolbar_info_wrapper .house_name {
          margin-bottom: 3px;
        }

        .house_toolbar_btns {
          display: flex;
          flex: 6;
        }

        .house_toolbar_btns > * {
          flex: 1;
        }

        .btn_text {
          font-size: 0.7em;
          margin-left: 5px;
        }

        // 미디어 쿼리
        @media all (min_width: 740px) {
          .house_body_top {
            height: 400px;
          }
        }

        @media all (min-width: 1024px) {
          .house_body_section {
            width: 1200px;
            margin: 0 auto;
          }

          .house_body_top {
            height: 436px;
          }

          .house_image_wrapper {
            height: 500px;
          }

          .room_map {
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
