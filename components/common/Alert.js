// ES6 Modules or TypeScript
import Swal from "sweetalert2";

// 성공 :success
// 에러 :error
// 경고 :warning
// 알림 :info
// 물음 :question

//확인 알럿 - 확인 취소 버튼이 없음
export const fireAlert = ({ icon, title ,text}) => {
  return Swal.fire({
    customClass: {
      container: "my-swal",
    },
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

//yes or no 알럿
export const confirmAlert = async ({ icon, title, text, successText }) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#777777",
    cancelButtonColor: "#76c1b2",
    confirmButtonText: "삭제",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("삭제완료", successText, "success");
      return true;
    }
    return false;
  });
  return result;
};
export const confirmAlertV2 = async ({ icon, title, text, successText }) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#777777",
    cancelButtonColor: "#76c1b2",
    confirmButtonText: "삭제",
  });
  return result;
};
export const confirmAlertV3 = async ({
  icon,
  title,
  text,
  successText,
  failText,
}) => {
  const result = await Swal.fire({
    title: title,
    // text: text,
    // icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#7066e0",
    cancelButtonColor: "#6e7881",
    confirmButtonText: successText,
    cancelButtonText: failText,
  });
  return result;
};
//입력 받는 알럿
export const inputAlert = ({ title }) => {
  Swal.fire({
    title: title + "33",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "확인",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url,
      });
    }
  });
};
