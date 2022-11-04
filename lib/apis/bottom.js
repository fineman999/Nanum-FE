import * as Api from "./apiClient";

export const SupplementarybaseURL =
  "https://nanum.site/supplementary-service/api/v1";
export const ChatbaseURL = "https://nanum.site/web-flux-service/api/v1";
export const getNoteCount = async ({ userId, cancelToken }) => {
  const res = await Api.getCancelToken(
    SupplementarybaseURL,
    `/notes/${userId}/count`,
    "",
    cancelToken
  );
  return res;
};

export const getChatCount = async ({ userId, cancelToken }) => {
  const res = await Api.getCancelToken(
    ChatbaseURL,
    `/rooms/users/${userId}/count`,
    "",
    cancelToken
  );
  return res;
};
