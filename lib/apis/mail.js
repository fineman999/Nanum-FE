import * as Api from "./apiClient";

//받은 쪽지 목록 가져오기
export const getReceivedMail = async (userId) => {
  const res = await Api.get(`/notes/${userId}/received`);
  return res;
};

//보낸 쪽지 목록 가져오기
export const getSentMail = async (userId) => {
  const res = await Api.get(`/notes/${userId}/sent`);
  return res;
};

//쪽지 보내기
export const postMail = async ({ noteDetails, images }) => {
  const res = await Api.post(`/notes`, noteDetails, images);
  return res;
};

//쪽지 삭제하기
export const deleteMail = async ({ noteId, userId }) => {
  const res = await Api.delete(`/notes/${noteId}/users/${userId}`);
  return res;
};
