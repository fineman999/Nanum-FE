import axios from "axios";

//baseurl
export const baseURL = "https://ssghot.shop/api/api";

//토큰 필요 없는 json 타입 요청시
export const basicApiClient = axios.create({
  baseURL: baseURL,
  headers: { "Content-type": "application/json", Authorization: ACCESS_TOKEN },
});

//토큰 필요 없는 멀티타입 요청시
export const basicFileApiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: ACCESS_TOKEN,
  },
});

// // //json 타입 요청시
// export const apiClient = axios.create({
//   baseURL: baseURL,
//   headers: {
//     "Content-type": "application/json",
//     Authorization: ACCESS_TOKEN,
//   },
// });

// // //멀티타입 요청시(이미지 파일)
// export const fileApiClient = axios.create({
//   baseURL: baseURL,
//   headers: {
//     Authorization: ACCESS_TOKEN,
//     "Content-type": "multipart/form-data",
//   },
// });
