import axios from "axios";
import * as Api from "./apiClient";

const baseURL = "https://nanum.site/board-service/api/v1";
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
export const getSearch = async ({
  title = "",
  categoryId = "",
  content = "",
  all = "",
} = {}) => {
  console.log(title);
  const res = await Api.get(
    baseURL,
    `/posts/search?content=${content}&categoryId=${categoryId}&title=${title}&all=${all}&size=20`
  );
  return res;
};
export const getSearchV2 = async ({
  search = "",
  categoryId = "",
  board = 0,
  curPage = 0,
} = {}) => {
  let sendData = {};
  if (board == 0) {
    sendData = {
      categoryId: categoryId == 0 ? "" : categoryId,
      all: search,
    };
  } else if (board == 1) {
    sendData = {
      categoryId: categoryId == 0 ? "" : categoryId,
      title: search,
    };
  } else {
    sendData = {
      categoryId: categoryId == 0 ? "" : categoryId,
      content: search,
    };
  }

  const res = await Api.get(
    baseURL,
    `/posts/search?content=${
      sendData.content ? sendData.content : ""
    }&categoryId=${sendData.categoryId ? sendData.categoryId : ""}&title=${
      sendData.title ? sendData.title : ""
    }&all=${sendData.all ? sendData.all : ""}&size=20&page=${curPage}`
  );
  return res;
};
export const deleteBoard = async (data) => {
  try {
    const result = await Api.delete(
      `https://nanum.site/board-service/api/v1/posts/`,
      data
    );
    if (!result) {
      throw new Error(`${result} not allowd`);
    }

    return result;
  } catch (e) {
    console.log("Error" + e);
  }
};
