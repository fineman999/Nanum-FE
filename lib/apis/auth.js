import * as Api from "./apiClient";

export const baseURL = "https://nanum.site/user-service/api/v1";
//로그인 baseurl
export const baseURL2 = "https://nanum.site/user-service";

//로그인 요청 보내기
export const postLogin = async (formdata) => {
  const res = await Api.post(baseURL2, `/login`, formdata);
  return res;
};

//회원가입 요청 보내기
export const postSignup = async (data) => {
  const res = await Api.post(baseURL, `/signup`, data);
  return res;
};

// {
//   "userRequest": {
//     "email": "spharos@gmail.com",
//     "pwd": "123456789",
//     "nickname": "별명",
//     "role": "USER",
//     "phone": "01012345678",
//     "gender": "M",
//     "noteReject": true
//   },
//   "profileImg": "string"
// }

//이메일 중복 검사
export const getEmail = async (email) => {
  const res = await Api.get(baseURL, `/check/email/${email}`);
  return res;
};
//닉네임 중복 검사
export const getNickname = async (nickname) => {
  const res = await Api.get(baseURL, `/check/nickname/${nickname}`);
  return res;
};
//휴대전화 인증 번호 요청
export const postPhone = async (phone) => {
  const res = await Api.post(baseURL, `/sms/sends`, {
    phoneNumber: phone,
    content: null,
  });
  return res;
};
//휴대전화 인증 번호 확인
export const postPhoneValid = async ({ phone, number }) => {
  const res = await Api.post(baseURL, `/sms/confirm`, {
    phoneNumber: phone,
    content: number,
  });
  return res;
};

//휴대전화 인증 번호 확인
export const postFindEmail = async ({ phoneValue, number }) => {
  const res = await Api.post(baseURL, `/sms/confirm/find/email`, {
    phoneNumber: phoneValue,
    content: number,
  });
  return res;
};

//사용자 조회
export const getUserDetail = async ({ userId }) => {
  const res = await Api.get(baseURL, `/users/${userId}`);
  return res;
};

//사용자 정보 수정
export const putUserDetail = async ({ userId, formData }) => {
  const res = await Api.put(`/users/${userId}`, formData);
  return res;
};
// {
//   "request": {
//     "phone": "01012345678",
//     "nickname": "아무거나 적어줘여",
//     "gender": "1",
//     "noteReject": true
//   },
//   "profileImg": "string"
// }

//비밀번호 변경
export const putPassword = async ({ userId, newPw }) => {
  const res = await Api.put(baseURL, `/users/${userId}/pw`, { newPw: newPw });
  return res;
};

//기존 번호와 일치한지 확인
export const getOriginPw = async ({ userId, pwd }) => {
  const res = await Api.get(baseURL, `/check/${userId}/pwd/${pwd}`);

  return res;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

//findEmailValid
export const findEmailValid = async (email) => {
  const res = await Api.get(baseURL, `/users/change/pw/email/${email}`);
  return res;
};
//findIdByPhone
export const findIdByPhone = async ({ phoneNumber, content }) => {
  console.log(phoneNumber, content);
  const res = await Api.post(baseURL, `/sms/confirm/change/pw`, {
    phoneNumber,
    content,
  });
  return res;
};
