import Swal from "sweetalert2";
import { getOriginPw } from "../../lib/apis/auth";

//입력 받는 알럿
export const inputAlert = ({ userId, title, setIsLock }) => {
  Swal.fire({
    title: title,
    html: `
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: "확인",
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const password = Swal.getPopup().querySelector("#password").value;
      if (!password) {
        Swal.showValidationMessage(`비밀번호를 입력해주세요`);
      }
      return { password: password };
    },
  }).then((result) => {
    const pwd = result.value.password;
    getOriginPw({ userId, pwd })
      .then((res) => {
        if (res.status == 200) {
          Swal.fire(
            `
        잠금이 해제되었습니다.
        `.trim()
          );
          setIsLock(false);
        }
        if (res.status == 204) {
          Swal.fire(
            `
          비밀번호가 틀렸어요.
        `.trim()
          );
          setIsLock(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
