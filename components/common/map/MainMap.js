import React, { useEffect } from "react";
import styles from "../../../styles/MainMap.module.css";
const MainMap = () => {
  useEffect(() => {
    const { kakao } = globalThis;
    kakao.maps.load(() => {});

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
        <h2>지역별 하우스 현황</h2>
      </div>

      <div id="map_container" className="main_map">
        <button>현재 위치</button>
      </div>
    </div>
  );
};

export default MainMap;
