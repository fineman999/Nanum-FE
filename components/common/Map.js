import Script from "next/script";
import React, { useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);

  const loadScript = () => {
    return `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_API_KEY}&autoload=false`;
  };

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>

      {/* Kakao Map API */}
      <Script
        src={loadScript()}
        onReady={() => {
          const { kakao } = globalThis;
          kakao.maps.load(() => {
            const mapContainer = mapRef.current;
            const mapOptions = {
              center: new kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            };

            const map = new kakao.maps.Map(mapContainer, mapOptions);
          });
        }}
      ></Script>
    </>
  );
};

export default Map;
