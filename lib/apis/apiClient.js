import axios from "axios";

if (typeof window !== "undefined") {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
}

async function get(baseUrl, endpoint) {
  if (localStorage.getItem("accessToken")) {
    return axios.get(baseUrl + endpoint, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
  return axios.get(baseUrl + endpoint, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getCancelToken(baseUrl, endpoint, cancelToken) {
  if (localStorage.getItem("accessToken")) {
    return axios.get(baseUrl + endpoint, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      cancelToken: cancelToken.token,
    });
  }
  return axios.get(baseUrl + endpoint, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      "Content-Type": "application/json",
    },
    cancelToken: cancelToken.token,
  });
}

async function post(baseUrl, endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  if (localStorage.getItem("accessToken")) {
    return axios.post(baseUrl + endpoint, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,

        // "Content-Type": "multipart/form-data",
        // Authorization: checkToken(),
      },
    });
  }
  return axios.post(baseUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
async function postCancelToken(baseUrl, endpoint, data, cancelToken) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  if (localStorage.getItem("accessToken")) {
    return axios.post(baseUrl + endpoint, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,

        // "Content-Type": "multipart/form-data",
        // Authorization: checkToken(),
      },
      cancelToken: cancelToken.token,
    });
  }
  return axios.post(baseUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
    cancelToken: cancelToken.token,
  });
}

async function put(baseUrl, endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  if (localStorage.getItem("accessToken")) {
    return axios.put(baseUrl + endpoint, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
  return axios.put(baseUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
async function putCancelToken(baseUrl, endpoint, data, cancelToken) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  if (localStorage.getItem("accessToken")) {
    return axios.put(baseUrl + endpoint, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      cancelToken: cancelToken.token,
    });
  }
  return axios.put(baseUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
    cancelToken: cancelToken.token,
  });
}
// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(baseUrl, endpoint) {
  if (localStorage.getItem("accessToken")) {
    return axios.delete(baseUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
  return axios.delete(baseUrl + endpoint);
}
async function delCancelToken(baseUrl, endpoint, cancelToken) {
  if (localStorage.getItem("accessToken")) {
    return axios.delete(baseUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      cancelToken: cancelToken.token,
    });
  }
  return axios.delete(baseUrl + endpoint, {
    cancelToken: cancelToken.token,
  });
}

async function postImg(baseUrl, endpoint, formdata) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  // const bodyData = JSON.stringify(data);

  return axios.post(baseUrl + endpoint, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
async function postImgCancelToken(baseUrl, endpoint, formdata, cancelToken) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  // const bodyData = JSON.stringify(data);

  return axios.post(baseUrl + endpoint, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    cancelToken: cancelToken.token,
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export {
  get,
  post,
  put,
  del,
  del as delete,
  postImg,
  getCancelToken,
  postCancelToken,
  putCancelToken,
  delCancelToken as deleteCancelToken,
};
