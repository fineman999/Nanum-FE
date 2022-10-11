import * as Api from "./apiClient";

const baseURL = "http://20.214.170.222:8000/supplementary-service/api/v1";
//받은 쪽지 목록 가져오기
export const getReceivedMail = async (userId) => {
  const res = await Api.get(baseURL, `/notes/${userId}/received`);
  return res;
};

//보낸 쪽지 목록 가져오기
export const getSentMail = async (userId) => {
  const res = await Api.get(baseURL, `/notes/${userId}/sent`);
  return res;
};

//쪽지 상세 조회하기
export const getMailDetail = async (noteId) => {
  const res = await Api.get(baseURL, `/notes/${noteId}`);
  return res;
};

//쪽지 보내기
export const postMail = async ({ noteDetails, images }) => {
  const res = await Api.post(baseURL, `/notes`, noteDetails, images);
  return res;
};

//쪽지 삭제하기
export const deleteMail = async ({ noteId, userId }) => {
  const res = await Api.delete(baseURL, `/notes/${noteId}/users/${userId}`);
  return res;
};
