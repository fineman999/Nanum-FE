import * as Api from "./apiClient";

export const baseURL = "https://nanum.site/supplementary-service/api/v1";
//차단 등록하기
export const postBlock = async ({ blockerId, blockedUserId }) => {
  const res = await Api.post(baseURL, `/blocks`, { blockerId, blockedUserId });
  return res;
};

//차단 목록 가져오기
export const getBlock = async ({ blockerId, page }) => {
  const res = await Api.get(baseURL, `/blocks/${blockerId}`, { params: page });
  return res;
};

//차단 취소하기
export const deleteBlock = async (blockId) => {
  const res = await Api.delete(baseURL, `/blocks/${blockId}`);
  return res;
};

// 차단 확인하기
export const getBlockByBlockerIdAndBlockedUserId = async ({
  blockerId,
  blockedUserId,
}) => {
  const res = await Api.get(
    baseURL,
    `/blocks/blocker/${blockerId}/blocked/${blockedUserId}`
  );
  return res;
};
