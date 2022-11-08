import Head from "next/head";
import Footer from "../../components/common/Footer";
import SubHeader from "../../components/common/SubHeader";
import { useEffect, useState } from "react";

import HouseToolbar from "../../components/HouseToolbar";
import HouseDetailTopMenu from "../../components/HouseDetailTopMenu";
import { useRouter } from "next/router";
import HouseDetailIntro from "../../components/HouseDetailIntro";
import HouseRoomDetail from "../../components/HouseRoomDetail";
import HouseNearDetail from "../../components/HouseNearDetail";
import HouseReviewDetail from "../../components/HouseReviewDetail";
import { get } from "../../lib/apis/apiClient";
import formatDate from "../../lib/fomatDate";
import { NotificationAlert } from "../../components/common/NotificationAlert";
import HouseDetailImageSwiper from "../../components/HouseDetailImageSwiper";
const House = () => {
  const router = useRouter();

  const [houseData, setHouseData] = useState({});
  const [roomData, setRoomData] = useState([]);
  const [tourForm, setTourForm] = useState({
    name: "",
    houseId: "",
    roomId: "",
    timeId: "",
    tourDate: formatDate(new Date()),
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { asPath } = router;
    const houseId = asPath.split("?")[1].split("=")[1];
    const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;
    const API_URI = `/houses/house/${houseId}`;

    get(BASE_URL, API_URI)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setHouseData(data.result);
        setTourForm({
          ...tourForm,
          houseId: data.result.id,
        });
      })
      .catch((err) => console.log("하우스 상세 조회 오류: ", err));
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
            <HouseDetailImageSwiper houseImages={houseData.houseImgs} />
          </div>
        </div>

        {/* 하우스 메뉴, 소개, 방 정보, 상세정보, 리뷰 */}
        <div className="house_body_contents">
          {/* 하우스 메뉴 */}
          <HouseDetailTopMenu />
          {/* 하우스 상세 소개 */}
          <HouseDetailIntro data={houseData} />
          {/* 하우스 방 정보 */}
          <HouseRoomDetail
            data={houseData}
            roomData={roomData}
            setRoomData={setRoomData}
            tourForm={tourForm}
            setTourForm={setTourForm}
            toggleDrawer={toggleDrawer}
          />
          {/* 하우스 주변 정보 */}
          <HouseNearDetail data={houseData} />
          {/* 하우스 리뷰 정보 */}
          <HouseReviewDetail data={houseData} />
        </div>
      </section>
      <Footer />

      {/* 하우스 툴바 */}
      <HouseToolbar
        houseData={houseData}
        roomData={roomData}
        tourForm={tourForm}
        setTourForm={setTourForm}
        open={open}
        toggleDrawer={toggleDrawer}
        hostId={houseData.hostId}
      />

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
      <NotificationAlert />
    </>
  );
};

export default House;
