import { basicApiClient } from "./apiClient";

//회원가입 요청 보내기
export const postSignup = async () => {
  const res = await basicApiClient.post(``);
  return res;
};
