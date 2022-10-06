import * as Api from "./apiClient";

const baseURL = "";
//신고하기
export const postPolice = async (data) => {
  const res = await Api.post(baseURL, `/polices`, data);
  return res;
};
//data형식
// {
//   "reportedUserId": 0,
//   "reporterId": 0,
//   "type": "NOTE",
//   "typeId": 0,
//   "reason": "Nope"
// }

//신고목록 가져오기
export const getPolice = async (page) => {
  const res = await Api.get(baseURL, `/polices`, { params: page });
  return res;
};

//신고 취소하기
export const deletePolice = async (policeId) => {
  const res = await Api.delete(baseURL, `/polices/${policeId}`);
  return res;
};
