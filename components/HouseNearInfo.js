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
      {/* 하우스 주변 지도 */}
      <div className="house_map" ref={mapRef}></div>
      <style jsx>{`
        .house_map {
          width: 100%;
          height: 300px;
        }
      `}</style>
    </>
  );
};

export default HouseNearInfo;
