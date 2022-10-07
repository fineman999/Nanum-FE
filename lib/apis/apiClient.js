import axios from "axios";

async function get(baseUrl, endpoint) {
  return axios.get(baseUrl + endpoint, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      "Content-Type": "application/json",
      // Authorization: checkToken(),
    },
  });
}

async function post(baseUrl, endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios.post(baseUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",

      // "Content-Type": "multipart/form-data",
      // Authorization: checkToken(),
    },
  });
}

async function put(baseUrl, endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios.put(baseUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: ACCESS_TOKEN,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(baseUrl, endpoint) {
  return axios.delete(baseUrl + endpoint, {
    headers: {
      // Authorization: ACCESS_TOKEN,
    },
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

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete, postImg };
