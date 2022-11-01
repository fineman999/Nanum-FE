// 토큰이 있는지 확인
export const isExistToken = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};
export const getSessionId = () => sessionStorage.getItem("userId");
// 토큰 가져오기
export const getToken = () => localStorage.getItem("token");

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// 휴대폰 번호 하이픈 추가
export const addHyphen = (n) =>
  n.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-");

// 페이지네이션 할 때, 특정 숫자까지의 배열을 만들고 limit 기준으로 자른 배열 만들기
export const sliceArrayByLimit = (totalPage, limit) => {
  const totalPageArray = Array(totalPage)
    .fill()
    .map((_, i) => i);
  return Array(Math.ceil(totalPage / limit))
    .fill()
    .map(() => totalPageArray.splice(0, limit));
};

// UTC 시간을 한국시간으로 변환, 포맷 : YYYY-MM-DD
export const getCurrentDate = (data) => {
  const currentDate = new Date(data);

  const year = currentDate.getFullYear();
  const month = `0${currentDate.getMonth() + 1}`.slice(-2);
  const day = `0${currentDate.getDate()}`.slice(-2);
  const hours = `0${currentDate.getHours()}`.slice(-2);
  const minutes = `0${currentDate.getMinutes()}`.slice(-2);
  const seconds = `0${currentDate.getSeconds()}`.slice(-2);
  const dateString = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

  return dateString;
};

export const sseConnect = (id) => {
  const eventSource = new EventSource(
    `https://nanum.site/web-flux-service/api/v1/alerts/user?param=${id}`
  ); //구독
  return eventSource;
};

export const displayedASpringMVC = (value) => {
  if (value === null) {
    return "";
  }
  const today = new Date();
  const timeValue = new Date(value);
  const now_date = new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
    today
  );
  const utc_date = new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
    timeValue
  );
  const utc_Intl = new Intl.DateTimeFormat("ko", { timeStyle: "short" }).format(
    timeValue
  );
  if (now_date !== utc_date) {
    return utc_date.split("년 ")[1];
  }
  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return `${utc_Intl}`;
  if (betweenTime < 60) {
    return `${utc_Intl}`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${utc_Intl}`;
  }
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const dateTimeForLocalTime = (data) => {
  const currentDate = new Date(data);

  const year = currentDate.getFullYear();
  const month = `0${currentDate.getMonth() + 1}`.slice(-2);
  const day = `0${currentDate.getDate()}`.slice(-2);

  return `${year}. ${month}. ${day}`;
};
export const displayedAt = (value) => {
  const today = new Date();
  const now = new Date(value);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const utc = new Date(now.getTime() + KR_TIME_DIFF);
  const now_date = new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
    today
  );
  const utc_date = new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
    utc
  );

  if (now_date !== utc_date) {
    return utc_date.split("년 ")[1];
  }
  const utc_Intl = new Intl.DateTimeFormat("ko", { timeStyle: "short" }).format(
    utc
  );

  const betweenTime = Math.floor((today.getTime() - utc.getTime()) / 1000 / 60);

  if (betweenTime < 1) return `${utc_Intl}`;
  if (betweenTime < 60) {
    return `${utc_Intl}`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${utc_Intl}`;
  }
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const displayedAtV2 = (value) => {
  const now = new Date(value);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const utc = new Date(now.getTime() + KR_TIME_DIFF);
  const utc_date = new Intl.DateTimeFormat("ko", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(utc);
  return utc_date;
};
