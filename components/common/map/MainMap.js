import { Button } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../../../styles/MainMap.module.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
const MainMap = () => {
  useEffect(() => {
    const { kakao } = globalThis;
    kakao.maps.load(() => {
      var mapContainer = document.getElementById("map_container"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.56809, 126.98016), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
          mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
        };
      // 지도를 생성한다
      var map = new kakao.maps.Map(mapContainer, mapOption);
    });

    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log(
              position.coords.latitude + " " + position.coords.longitude
            );
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
      }
    }
    getLocation();
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
