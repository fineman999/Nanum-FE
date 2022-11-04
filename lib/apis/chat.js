import * as Api from "./apiClient";

const baseURL = "https://nanum.site/web-flux-service/api/v1";

export const getChat = async ({ houseId, users }) => {
  const res = await Api.get(baseURL, `/rooms/houses/${houseId}?users=${users}`);
  return res;
};
export const postChat = async (data) => {
  const res = await Api.post(baseURL, `/rooms`, data);
  return res;
};

export const getHouseChat = async ({ houseId }) => {
  const res = await Api.get(baseURL, `/rooms/houses/${houseId}/one`);
  return res;
};

///rooms/:id/users/:userId
export const putChat = async ({ id, userId }) => {
  const res = await Api.put(baseURL, `/rooms/${id}/users/${userId}`);
  return res;
};
