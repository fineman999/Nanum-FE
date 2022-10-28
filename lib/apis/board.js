import axios from "axios";
import * as Api from "./apiClient";

export const getNotice = async (cancelToken) => {
  try {
    const getBoards = await Api.getCancelToken(
      `https://nanum.site/board-service/api/v1/posts/category/1`,
      `?page=0&size=5`,
      cancelToken
    );
    if (!getBoards) {
      throw new Error(`${getBoards} not allowd`);
    }

    return getBoards;
  } catch (e) {
    console.log("Error" + e);
  }
};

export const getBoard = async (boardId, cancelToken) => {
  try {
    const getBoards = await Api.get(
      `https://nanum.site/board-service/api/v1/posts/`,
      boardId
    );
    if (!getBoards) {
      throw new Error(`${getBoards} not allowd`);
    }

    return getBoards;
  } catch (e) {
    console.log("Error" + e);
  }
};

export const getAll = async (cancelToken) => {
  try {
    const getBoards = await Api.getCancelToken(
      `https://nanum.site/board-service/api/v1/posts/category/2`,
      `?page=0&size=5`,
      cancelToken
    );
    if (!getBoards) {
      throw new Error(`${getBoards} not allowd`);
    }

    return getBoards;
  } catch (e) {
    console.log("Error" + e);
  }
};
export const getInfo = async (cancelToken) => {
  try {
    const getBoards = await Api.getCancelToken(
      `https://nanum.site/board-service/api/v1/posts/category/3`,
      `?page=0&size=5`,
      cancelToken
    );
    if (!getBoards) {
      throw new Error(`${getBoards} not allowd`);
    }

    return getBoards;
  } catch (e) {
    console.log("Error" + e);
  }
};
