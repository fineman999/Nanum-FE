import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import css from "styled-jsx/css";
import { fireAlert } from "../components/common/Alert";
import { getUserDetail, postLogin } from "../lib/apis/auth";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from "../lib/apis/login";
import { authState, userState } from "../state/atom/authState";

const style = css`
  #login {
    background-color: #edf1f1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 100vh;
  }
  #login_innercontainer {
    width: 350px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    box-sizing: border-box;
    border: 2px #76c1b2 solid;
    border-radius: 30px;
    width: 100%;
    height: 7vh;
    padding: 0.75rem;
    font-size: 1.25rem;
  }
  input[type="password"] {
    font-size: 2rem;
  }
  input::placeholder {
    font-size: 1.125rem !important;
    font-weight: initial;
    text-shadow: none;
    position: absolute;
    margin-top: 2%;
  }
  input:focus::placeholder {
    color: transparent;
  }

  label {
    color: #76c1b2;
    font-weight: bold;
    margin-left: 0.5rem;
    font-size: 1.125rem;
  }
  #login_header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: flex-start;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
  #login_header h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: -1px;
    color: #ffff;
    position: absolute;
  }
  #title {
    color: #76c1b2;
  }
  #login_body {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
  #login_body article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  #login_body > *:first-child {
    margin-bottom: 1.25rem;
  }
  #link {
    width: 75%;
    display: flex;
    justify-content: space-evenly;
    margin: 1.25rem;
  }
  a {
    color: black;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: bold;
    letter-spacing: -1px;
  }
  button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    width: 60%;
  }
  #social_btn button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0ede7;
    color: black;
    width: 35vh;
    min-width: 300px;
    height: 4.5vh;
    min-height: 45px;
    margin: 0.75rem;
  }
  #social_btn img {
    width: 4vh;
    height: 4vh;
    margin-right: 1rem;
  }
  #back_house {
    width: 100%;
  }
`;

export default function Login() {
  const [userInput, setUserInput] = useState({ email: "", pwd: "" });
  const [authData, setAuthData] = useRecoilState(authState);
  const [userData, setUserData] = useRecoilState(userState);
  const router = useRouter();

  //로그인 하기
  const goLogin = (e) => {
    e.preventDefault();
    if (userInput.email && userInput.pwd) {
      console.log(userInput);
      postLogin(userInput)
        .then((res) => {
          console.log(res, "로그인");
          const userId = res.data.result.userId;
          localStorage.setItem("accessToken", res.data.result.accessToken);
          sessionStorage.setItem("userId", res.data.result.userId);
          sessionStorage.setItem("role", res.data.result.role);
          fireAlert({ icon: "success", title: "로그인 성공하였습니다." });
          setAuthData({ isLogin: true });
          getUserDetail({ userId })
            .then((Res) => {
              setUserData(Res.data.result);
              console.log(Res);
              router.push("/");
            })
            .catch((Err) => {
              console.log(Err);
            });
        })

        .catch((err) => {
          console.log(err);
          fireAlert({ icon: "error", title: "로그인에 실패하였습니다." });
        });
    } else {
      fireAlert({ icon: "warning", title: "입력을 확인해주세요." });
    }
  };
  return (
    <>
      <div id="login">
        <div id="login_header">
          <img
            id="back_house"
            src="/images/default_house.png"
            alt="back_house"
          />
          <h1 style={{ top: "55%", left: "5%" }}>어떤 집에</h1>
          <h1 style={{ top: "75%", left: "5%" }}>살고 싶으세요?</h1>
        </div>
        <div id="login_innercontainer">
          <h1 id="title" onClick={() => router.push("/")}>
            NANUM
          </h1>
          <form id="login_body">
            <article id="email_form">
              <label htmlFor="email">이메일</label>
              <input
                type="text"
                id="email"
                placeholder="이메일을 입력해주세요."
                onBlur={(e) =>
                  setUserInput({ ...userInput, email: e.target.value })
                }
              />
            </article>
            <article id="password_form">
              <label htmlFor="pw">비밀번호</label>
              <input
                type="password"
                id="pw"
                placeholder="비밀번호를 입력해주세요."
                onBlur={(e) => {
                  setUserInput({ ...userInput, pwd: e.target.value });
                }}
              />
            </article>
            <div id="link">
              <Link href="">
                <a>이메일 찾기</a>
              </Link>
              <Link href="">
                <a>비밀번호 찾기</a>
              </Link>
              <Link href="/signup/check">
                <a>회원가입</a>
              </Link>
            </div>
            <button onClick={goLogin}>로그인</button>
          </form>
          <article id="social_btn">
            <Link href={NAVER_AUTH_URL}>
              <button id="naver">
                <img src="/images/naver.png" alt="naver" />
                <p>Naver로 로그인</p>
              </button>
            </Link>
            <Link href={KAKAO_AUTH_URL}>
              <button id="kakao">
                <img src="/images/kakao.png" alt="kakao" />
                <p>Kakao로 로그인</p>
              </button>
            </Link>
            <Link href={GOOGLE_AUTH_URL}>
              <button id="google">
                <img src="/images/google.png" alt="google" />
                <p>Google로 로그인</p>
              </button>
            </Link>
          </article>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
