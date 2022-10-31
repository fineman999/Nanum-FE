import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/MainMap.module.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
const MainMap = () => {
  const [nearHoustList, setNearHouseList] = useState([]);
  useEffect(() => {
    const { kakao } = globalThis;
    kakao.maps.load(() => {
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
    });
  }, []);

  return (
    <div className={styles.main_map_wrapper}>
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
  );
};

export default MainMap;
