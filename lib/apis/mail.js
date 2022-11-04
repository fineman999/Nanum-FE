import * as Api from "./apiClient";

const baseURL = "https://nanum.site/supplementary-service/api/v1";
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
export const getMailDetail = async ({ noteId, userId }) => {
  const res = await Api.get(baseURL, `/notes/${noteId}/users/${userId}`);
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

export const sendAlert = async ({ title, content, userIds, url }) => {
  const res = await Api.post(
    "https://nanum.site/web-flux-service",
    `/api/v1/alerts`,
    { title, content, userIds, url }
  );
  return res;
};
