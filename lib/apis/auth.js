import { basicApiClient } from "./apiClient";

//회원가입 요청 보내기
export const postSignup = async (data) => {
  const res = await basicApiClient.post(`/signup`, data);
  return res;
};
//이메일 중복 검사
export const getEmail = async (email) => {
  const res = await basicApiClient.get(`/check/email/${email}`);
  return res;
};
//닉네임 중복 검사
export const getNickname = async (nickname) => {
  const res = await basicApiClient.get(`/check/nickname/${nickname}`);
  return res;
};
//휴대전화 인증 번호 요청
export const postPhone = async (phone) => {
  const res = await basicApiClient.post(`/sms/sends`, {
    phoneNumber: phone,
    content: null,
  });
  return res;
};
//휴대전화 인증 번호 확인
export const postPhoneValid = async ({ phone, number }) => {
  const res = await basicApiClient.post(`/sms/confirm`, {
    phoneNumber: phone,
    content: number,
  });
  return res;
};
