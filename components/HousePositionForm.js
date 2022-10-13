import React, { useEffect } from "react";

const { kakao } = globalThis;

const HousePositionForm = ({ form, handlePosition }) => {
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
            }
          }
        );
      }
    });
  }, [form.houseRequest.streetAddress]);
  return (
    <>
      <div className="geo_section">
        <h1>주소 좌표 정보</h1>
        <div>위도: {form.houseRequest.lat}</div>
        <div>경도: {form.houseRequest.lon}</div>
      </div>
    </>
  );
};

export default HousePositionForm;
