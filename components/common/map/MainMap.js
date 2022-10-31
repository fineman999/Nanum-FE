import { Button } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../../../styles/MainMap.module.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { get } from "../../../lib/apis/apiClient";
import Swal from "sweetalert2";

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const MainMap = () => {
  useEffect(() => {
    const { kakao } = globalThis;
    kakao.maps.load(() => {
      // 마커 이미지
      const imageSrc =
        "https://cdn-icons-png.flaticon.com/512/3477/3477419.png"; // 마커이미지의 주소입니다
      const imageSize = new kakao.maps.Size(42, 42); // 마커이미지의 크기입니다
      const imageOptions = {};
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOptions
      );

      let mapContainer = document.getElementById("map_container");
      let mapOption = {
        center: new kakao.maps.LatLng(35.1659659088957, 129.132374315529), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      }; // 지도를 표시할 div

      // 마커가 표시될 위치입니다
      let markerPosition = new kakao.maps.LatLng(
        35.1659659088957,
        129.132374315529
      );

      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            mapOption = {
              center: new kakao.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              ), // 지도의 중심좌표
              level: 5, // 지도의 확대 레벨
              mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
            };

            // 마커가 표시될 위치입니다
            markerPosition = new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            // 마커를 생성합니다
            marker = new kakao.maps.Marker({
              position: markerPosition,
            });
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        console.log("GPS를 지원하지 않습니다");

        mapOption = {
          center: new kakao.maps.LatLng(35.1659659088957, 129.132374315529), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
          mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
        };
      }

      // 마커가 지도 위에 표시되도록 설정합니다
      // 지도를 생성한다
      var map = new kakao.maps.Map(mapContainer, mapOption);
      marker.setMap(map);

      const position = map.getCenter();
      const bounds = map.getBounds();
      const swLatLng = bounds.getSouthWest();
      const API_URI = `/houses/search/map?cX=${position.getLng()}&cY=${position.getLat()}&swX=${swLatLng.getLng()}&swY=${swLatLng.getLat()}`;
      get(BASE_URL, API_URI).then((res) => {
        const clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 4, // 클러스터 할 최소 지도 레벨
        });

        const markers = res.data.result.map((listItem) => {
          const position = new kakao.maps.LatLng(
            Number(listItem.lat), // Y
            Number(listItem.lon) // X
          );
          const marker = new kakao.maps.Marker({
            map: map,
            position: position,
            image: markerImage,
            title: listItem.houseName,
          });

          kakao.maps.event.addListener(marker, "click", function () {
            Swal.fire({
              title: "하우스로 이동하시겠습니까?",
              showDenyButton: true,
              confirmButtonText: "네",
              denyButtonText: "아니오",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
              }
            });
          });

          return marker;
        });

        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);
      });
    });
  }, []);

  return (
    <div className={styles.main_map_wrapper}>
      <div className={styles.main_map_layout}>
        <div className={styles.main_map_title}>
          <h2>주변 하우스</h2>
        </div>

        <div id="map_container" className={styles.main_map_container}>
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: "100",
            }}
            startIcon={<MyLocationIcon />}
          >
            현재 위치
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainMap;
