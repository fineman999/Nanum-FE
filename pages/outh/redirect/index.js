import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import css from "styled-jsx/css";
import { fireAlert } from "../../../components/common/Alert";
import { getUserDetail } from "../../../lib/apis/auth";
import { authState, userState } from "../../../state/atom/authState";

const style = css`
  #signup_check {
    background-color: #edf1f1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 92.5vh;
    padding: 2rem 0rem;
  }
  #check_header {
    text-align: center;
    margin: 5rem 0rem 3rem 0rem;
  }
  h1 {
    margin: 0.5rem;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: -1px;
    color: #76c1b2;
  }
  h3 {
    margin: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1px;
    color: #76c1b2;
  }
  #choose {
    display: flex;
    border: 2px solid #76c1b2;
  }
  hr {
    margin: 0px;
    border: 1px solid #76c1b2;
  }
  p {
    margin-top: 0px;
  }
  #choose article {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    position: relative;
    cursor: pointer;
  }
  button {
    margin: 1rem;
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    width: 80%;
  }
  #btn {
    margin-top: 3rem;
    display: flex;
    width: 50vh;
  }
  #back_btn {
    background-color: #777777;
  }
  #checked {
    background-color: #7777;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0rem;
  }
`;
export default function RedirectOuth() {
  const router = useRouter();
  const [authData, setAuthData] = useRecoilState(authState);
  const [userData, setUserData] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
    socialType: "",
    mobile: "",
    gender: "",
  });
  useEffect(() => {
    // 인가코드
    const userId = new URL(window.location.href).searchParams.get("userId");
    if (userId) {
      const role = new URL(window.location.href).searchParams.get("role");
      const token = new URL(window.location.href).searchParams.get("token");

      localStorage.setItem("accessToken", token);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("role", role);
      fireAlert({ icon: "success", title: "로그인 성공하였습니다." });
      setAuthData({ isLogin: true });
      getUserDetail({ userId })
        .then((res) => {
          setUserData(res.data.result);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const socialType = new URL(window.location.href).searchParams.get(
        "socialType"
      );

      if (socialType === "naver") {
        const result = {
          email: new URL(window.location.href).searchParams.get("email"),
          nickname: new URL(window.location.href).searchParams.get("nickname"),
          socialType: "naver",
          mobile: new URL(window.location.href).searchParams.get("mobile"),
          gender: new URL(window.location.href).searchParams.get("gender"),
        };
        router.push(
          {
            pathname: "/outh/check",
            query: {
              email: result.email,
              nickname: result.nickname,
              socialType: result.socialType,
              mobile: result.mobile,
              gender: result.gender,
            },
          },
          "/outh/check"
        );
      } else {
        const result = {
          email: new URL(window.location.href).searchParams.get("email"),
          nickname: new URL(window.location.href).searchParams.get("nickname"),
          socialType: socialType,
        };
        router.push(
          {
            pathname: "/outh/check",
            query: {
              email: result.email,
              nickname: result.nickname,
              socialType: result.socialType,
            },
          },
          "/outh/check"
        );
      }
    }
  }, []);
  return <></>;
}
