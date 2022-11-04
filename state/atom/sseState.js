import { useRef } from "react";

let eventSource = null;
let userId = 0;
// export const sseState = atom({
//   key: "sseState",
//   default: {
//     eventSource: null,
//   },
//   effects_UNSTABLE: [persistAtom],
// });
function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

function debounce(func, wait) {
  var timeout;
  var waitFunc;

  return function () {
    if (isFunction(wait)) {
      waitFunc = wait;
    } else {
      waitFunc = function () {
        return wait;
      };
    }

    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, waitFunc());
  };
}

// reconnectFrequencySeconds doubles every retry
var reconnectFrequencySeconds = 1;

var reconnectFunc = debounce(
  function () {
    setupEventSource(userId);
    // Double every attempt to avoid overwhelming server
    reconnectFrequencySeconds *= 2;
    // Max out at ~1 minute as a compromise between user experience and server load
    if (reconnectFrequencySeconds >= 64) {
      reconnectFrequencySeconds = 64;
    }
  },
  function () {
    return reconnectFrequencySeconds * 1000;
  }
);

export function setupEventSource(id) {
  if (id != undefined) {
    userId = id;
    eventSource = new EventSource(
      `https://nanum.site/web-flux-service/api/v1/alerts/users?param=${id}`
    );
  } else {
    eventSource = new EventSource(
      `https://nanum.site/web-flux-service/api/v1/alerts/users?param=${userId}`
    );
  }

  eventSource.onmessage = function (event) {
    console.log(event);
    console.log(`onmessage:Data${event.data}`);
    const data = JSON.parse(event.data);

    (async () => {
      // 브라우저 알림
      const showNotification = () => {
        const notification = new Notification(data.title, {
          body: data.content,
        });

        setTimeout(() => {
          notification.close();
        }, 1 * 1000);

        notification.addEventListener("click", () => {
          window.open(data.url, "_blank");
        });
      };

      // 브라우저 알림 허용 권한
      let granted = false;

      if (Notification.permission === "granted") {
        granted = true;
      } else if (Notification.permission !== "denied") {
        let permission = await Notification.requestPermission();
        granted = permission === "granted";
      }

      // 알림 보여주기
      if (granted) {
        showNotification();
      }
    })();
  };
  eventSource.onopen = function (e) {
    // Reset reconnect frequency upon successful connection
    reconnectFrequencySeconds = 1;
  };
  eventSource.onerror = function (e) {
    eventSource.close();
    reconnectFunc();
  };
}

export const startSSE = (id) => {
  const eventSource = new EventSource(
    `https://nanum.site/web-flux-service/api/v1/alerts/users?param=${id}`
  ); //구독
  // const  eventSource = new EventSource(`http://localhost:8080/api/v1/alerts/users?param=${userId}`); //구독

  eventSource.onopen = (event) => {
    console.log("connection opened");
  };

  eventSource.onmessage = async (event) => {
    console.log(event);
    console.log(`onmessage:Data${event.data}`);
    const data = JSON.parse(event.data);
    (async () => {
      // 브라우저 알림
      const showNotification = () => {
        const notification = new Notification("NANUM", {
          body: data.content,
        });

        setTimeout(() => {
          notification.close();
        }, 10 * 1000);

        notification.addEventListener("click", () => {
          window.open(data.url, "_blank");
        });
      };

      // 브라우저 알림 허용 권한
      let granted = false;

      if (Notification.permission === "granted") {
        granted = true;
      } else if (Notification.permission !== "denied") {
        let permission = await Notification.requestPermission();
        granted = permission === "granted";
      }

      // 알림 보여주기
      if (granted) {
        showNotification();
      }
    })();
  };

  eventSource.onerror = (event) => {
    if (event.target.readyState === EventSource.CLOSED) {
      console.log("eventsource closed (" + event.target.readyState + ")");
    }
    eventSource.close();
  };
};
// export const getMessageSSeState = selector({
//   key: "charCountState", // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const text = get(textState);

//     return text.length;
//   },
// });
// export const getOpenSSeState = selector({
//   key: "charCountState", // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const text = get(textState);

//     return text.length;
//   },
// });
// export const getErrorSSeState = selector({
//   key: "charCountState", // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const text = get(textState);

//     return text.length;
//   },
// });
