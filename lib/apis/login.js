// 네이버
// https://nanum.site/oauth2/authorization/naver?rediret_uri=https://nanum.site/login/oauth2/code/social
// 구글
// https://nanum.site/oauth2/authorization/google?rediret_uri=https://nanum.site/login/oauth2/code/social
// 카카오
// https://nanum.site/oauth2/authorization/kakao?rediret_uri=https://nanum.site/login/oauth2/code/social

// export const API_BASE_URL = "http://localhost:8080";
export const API_BASE_URL = "https://nanum.site";

// export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";
export const OAUTH2_REDIRECT_URI =
  "https://nanum.site/login/oauth2/code/social";
export const RESPONSE = "&response_type=code";
export const GOOGLE_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/google?rediret_uri=" +
  OAUTH2_REDIRECT_URI +
  "&response_type=code";
export const NAVER_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/naver?rediret_uri=" +
  OAUTH2_REDIRECT_URI +
  "&response_type=code";

export const KAKAO_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/kakao?rediret_uri=" +
  OAUTH2_REDIRECT_URI +
  "&response_type=code";
