import React, { useEffect, useRef } from "react";

import styles from "../styles/HousePositionForm.module.css";
const { kakao } = globalThis;

const HousePositionForm = ({ form, handlePosition }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // 주소 → 좌표(위도, 경도) 검색
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      if (form.houseRequest.streetAddress) {
        geocoder.addressSearch(
          form.houseRequest.streetAddress,
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              handlePosition(result);

              // 이미지 지도에서 마커가 표시될 위치입니다
              var markerPosition = new kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 이미지 지도에 표시할 마커입니다
              // 이미지 지도에 표시할 마커는 Object 형태입니다
              var marker = {
                position: markerPosition,
              };

              var staticMapContainer = mapRef.current, // 이미지 지도를 표시할 div
                staticMapOption = {
                  center: new kakao.maps.LatLng(result[0].y, result[0].x), // 이미지 지도의 중심좌표
                  level: 6, // 이미지 지도의 확대 레벨
                  marker: marker, // 이미지 지도에 표시할 마커
                };

              // 이미지 지도를 생성합니다
              var staticMap = new kakao.maps.StaticMap(
                staticMapContainer,
                staticMapOption
              );
            }
          }
        );
      }
    });
  }, [form.houseRequest.streetAddress]);
  return <div ref={mapRef} className={styles.position_map}></div>;
};

export default HousePositionForm;
