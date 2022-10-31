import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SubHeader from "../../../components/common/SubHeader";
import { get } from "../../../lib/apis/apiClient";

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;
const { kakao } = globalThis;

const Region = () => {
  const router = useRouter();
  const [region, setRegion] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(router);
    const params = new URLSearchParams(router.asPath.split("?")[1]);
    setRegion(params.get("region"));

    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(params.get("region"), function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          const mapContainer = mapRef.current;
          let mapCenter = new kakao.maps.LatLng(result[0].y, result[0].x);
          let mapLevel = 7;

          let mapOptions = {
            center: mapCenter,
            level: mapLevel,
          };

          const map = new kakao.maps.Map(mapContainer, mapOptions);
          map.setCenter(coords);

          const API_URI = `/houses/search/region?searchWord=${params.get(
            "region"
          )}`;

          get(BASE_URL, API_URI).then((res) => {
            const { status } = res;
            const { isSuccess, message, result } = res.data;

            console.log(result);
            if (status === 200 && isSuccess) {
              // 마커 클러스터러를 생성합니다
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
                  // image: markerImage,
                  title: listItem.id,
                });

                kakao.maps.event.addListener(marker, "click", function () {
                  router.push({
                    pathname: `/house/${marker.getTitle()}`,
                  });
                });

                return marker;
              });

              // 클러스터러에 마커들을 추가합니다
              clusterer.addMarkers(markers);

              return result;
            }
          });
        }
      });
    });
  }, [router]);

  const getRegion = () => {
    return `${region} 지역 하우스`;
  };

  return (
    <>
      <Head>
        <title>{region} 하우스</title>
      </Head>
      <SubHeader title={getRegion()} type="search" />
      <div id="map_container" className="map_container" ref={mapRef}></div>
      <style jsx>{`
        #map_container {
          width: 100%;
          height: 93vh;
        }
      `}</style>
    </>
  );
};

export default Region;
