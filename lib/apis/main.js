import * as Api from "./apiClient";

const baseURL = "https://nanum.site/house-service/api/v1/houses/";
//받은 쪽지 목록 가져오기
export const getPopularMain = async (cancelToken) => {
  const res = await Api.getCancelToken(baseURL, `/main/popular`, cancelToken);
  return res;
};
export const getMyMain = async (cancelToken) => {
  const res = await Api.getCancelToken(baseURL, `/main/myroom`, cancelToken);
  return res;
};
export const getShareMain = async (cancelToken) => {
  const res = await Api.getCancelToken(baseURL, `/main/sharelist`, cancelToken);
  return res;
};
