import * as Api from "./apiClient";

const baseURL = "http://20.214.170.222:8000/web-flux-service/api/v1";

export const getChat = async ({ houseId, users }) => {
  const res = await Api.get(baseURL, `/rooms/houses/${houseId}?users=${users}`);
  return res;
};
export const postChat = async (data) => {
  const res = await Api.post(baseURL, `/rooms`, data);
  return res;
};
