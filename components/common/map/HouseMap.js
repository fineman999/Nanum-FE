import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { get } from "../../../lib/apis/apiClient";

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const HouseMap = ({ setHouseList }) => {
  const router = useRouter();
  const mapRef = useRef(null);

  useEffect(() => {
    // 지역 카테고리로 검색하는 경우
    // 검색 키워드로 검색하는 경우
    const encodeUri = decodeURIComponent(router.asPath);
    const encodeUriTokens = encodeUri.split("&");
    const searchInput = encodeUriTokens[0].split("=")[1].split("+").join(" ");
    let queryStrings;
    if (encodeUriTokens.length > 1) {
      queryStrings = {
        searchArea: encodeUriTokens[1].split("=")[1],
        genderType: encodeUriTokens[2].split("=")[1],
        houseType: encodeUriTokens[3].split("=")[1],
      };
    }

    const { kakao } = globalThis;
    kakao.maps.load(() => {
      const mapContainer = mapRef.current;
      const mapOptions = {
        center: new kakao.maps.LatLng(35.1659659088957, 129.132374315529),
        level: 4,
      };

      const map = new kakao.maps.Map(mapContainer, mapOptions);
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

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        searchInput
          ? searchInput
          : "부산광역시 해운대구 우동 1514 센텀리더스마크 401호",
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);

            const position = map.getCenter();
            const bounds = map.getBounds();
            const swLatLng = bounds.getSouthWest();

            let API_URI;

            // 일반 검색

            if (searchInput !== undefined) {
              API_URI = `/houses/search/map?sk=${searchInput}&cX=${position.getLng()}&cY=${position.getLat()}&swX=${swLatLng.getLng()}&swY=${swLatLng.getLat()}`;
            } else {
              // 검색어 없는 경우
            }

            // 상세 검색
            if (queryStrings !== undefined) {
              API_URI = `/houses/search/map?sk=${searchInput}&ar=${
                queryStrings.searchArea
              }&gt=${queryStrings.genderType}&ht=${
                queryStrings.houseType
              }&cX=${position.getLng()}&cY=${position.getLat()}&swX=${swLatLng.getLng()}&swY=${swLatLng.getLat()}`;
            }

            get(BASE_URL, API_URI)
              .then((res) => {
                const { status } = res;
                const { isSuccess, message, result } = res.data;

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
                    image: markerImage,
                    title: listItem.houseName,
                  });

                  kakao.maps.event.addListener(marker, "click", function () {
                    alert(marker.getTitle());
                  });

                  return marker;
                });

                // 클러스터러에 마커들을 추가합니다
                clusterer.addMarkers(markers);
                if (status === 200 && isSuccess) {
                  return result;
                }
              })
              .then((data) => {
                Promise.all(
                  data.map((listItem) => {
                    const { id: houseId } = listItem;
                    return axios.get(
                      BASE_URL + `/houses/house/${houseId}/total`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        },
                      }
                    );
                  })
                ).then((values) => {
                  // console.log("하우스 목록 조회: ", data);
                  // console.log("하우스 리뷰 조회: ", values);
                  const valueList = values.map((value) => {
                    return { ...value.data.result };
                  });
                  const nextHouseList = data.map((listItem) => {
                    const total = valueList.filter(
                      (value) => listItem.id === value.id && value
                    );
                    return {
                      ...listItem,
                      maxMonthlyRent: total[0].maxMonthlyRent,
                      minMonthlyRent: total[0].minMonthlyRent,
                      reviewAvg: total[0].reviewAvg,
                      reviewCount: total[0].reviewCount,
                      wishCount: total[0].wishCount,
                      wishId: total[0].wishId,
                    };
                  });
                  setHouseList(nextHouseList);
                });
              });
          }
        }
      );

      // // 드래그 이벤트 핸들러
      kakao.maps.event.addListener(map, "dragend", () => {
        const position = map.getCenter();
        const bounds = map.getBounds();
        // 영역의 남서쪽 좌표를 얻어옵니다
        const swLatLng = bounds.getSouthWest();
        const API_URI = `/houses/search/map?cX=${position.getLng()}&cY=${position.getLat()}&swX=${swLatLng.getLng()}&swY=${swLatLng.getLat()}`;

        get(BASE_URL, API_URI)
          .then((res) => {
            const { status } = res;
            const { isSuccess, message, result } = res.data;

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
                image: markerImage,
                title: listItem.houseName,
              });

              kakao.maps.event.addListener(marker, "click", function () {
                alert(marker.getTitle());
              });

              return marker;
            });

            // 클러스터러에 마커들을 추가합니다
            clusterer.addMarkers(markers);
            if (status === 200 && isSuccess) {
              return result;
            }
          })
          .then((data) => {
            Promise.all(
              data.map((listItem) => {
                const { id: houseId } = listItem;
                return axios.get(BASE_URL + `/houses/house/${houseId}/total`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                });
              })
            ).then((values) => {
              // console.log("하우스 목록 조회: ", data);
              // console.log("하우스 리뷰 조회: ", values);
              const valueList = values.map((value) => {
                return { ...value.data.result };
              });
              const nextHouseList = data.map((listItem) => {
                const total = valueList.filter(
                  (value) => listItem.id === value.id && value
                );
                return {
                  ...listItem,
                  maxMonthlyRent: total[0].maxMonthlyRent,
                  minMonthlyRent: total[0].minMonthlyRent,
                  reviewAvg: total[0].reviewAvg,
                  reviewCount: total[0].reviewCount,
                  wishCount: total[0].wishCount,
                  wishId: total[0].wishId,
                };
              });
              setHouseList(nextHouseList);
            });
          });
      });

      // 확대/축소 이벤트 핸들러
      kakao.maps.event.addListener(map, "zoom_changed", function () {
        const position = map.getCenter();
        const bounds = map.getBounds();
        // 영역의 남서쪽 좌표를 얻어옵니다
        const swLatLng = bounds.getSouthWest();
        const API_URI = `/houses/search/map?cX=${position.getLng()}&cY=${position.getLat()}&swX=${swLatLng.getLng()}&swY=${swLatLng.getLat()}`;

        get(BASE_URL, API_URI)
          .then((res) => {
            const { status } = res;
            const { isSuccess, message, result } = res.data;

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
                image: markerImage,
                title: listItem.houseName,
              });

              kakao.maps.event.addListener(marker, "click", function () {
                alert(marker.getTitle());
              });

              return marker;
            });
            // 클러스터러에 마커들을 추가합니다
            clusterer.addMarkers(markers);
            if (status === 200 && isSuccess) {
              return result;
            }
          })
          .then((data) => {
            Promise.all(
              data.map((listItem) => {
                const { id: houseId } = listItem;
                return axios.get(BASE_URL + `/houses/house/${houseId}/total`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                });
              })
            ).then((values) => {
              const valueList = values.map((value) => {
                return { ...value.data.result };
              });
              const nextHouseList = data.map((listItem) => {
                const total = valueList.filter(
                  (value) => listItem.id === value.id && value
                );
                return {
                  ...listItem,
                  maxMonthlyRent: total[0].maxMonthlyRent,
                  minMonthlyRent: total[0].minMonthlyRent,
                  reviewAvg: total[0].reviewAvg,
                  reviewCount: total[0].reviewCount,
                  wishCount: total[0].wishCount,
                  wishId: total[0].wishId,
                };
              });
              setHouseList(nextHouseList);
            });
          });
      });
    });
  }, [router]);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};

export default HouseMap;
