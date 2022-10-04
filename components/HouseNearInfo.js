import React, { useEffect, useRef } from "react";

const HouseNearInfo = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { kakao } = globalThis;

    kakao.maps.load(() => {
      const staticMapContainer = mapRef.current;
      const staticMapOption = {
        center: new kakao.maps.LatLng(35.1659659088957, 129.132374315529),
        level: 5,
      };

      const staticMap = new kakao.maps.StaticMap(
        staticMapContainer,
        staticMapOption
      );
    });
  }, []);

  return (
    <>
      <div id="house_detail" className="house_detail_info_wrapper">
        <div className="house_info_header">
          <h2>주변 정보</h2>
        </div>
        {/* 하우스 주변 지도 */}
        <div className="house_map" ref={mapRef}></div>
      </div>
      <style jsx>{`
        .house_detail_info_wrapper {
          background: white;
          margin-bottom: 20px;
        }

        .house_info_header {
          box-sizing: border-box;
          padding: 20px;
        }

        .house_map {
          width: 100%;
          height: 300px;
        }
      `}</style>
    </>
  );
};

export default HouseNearInfo;
