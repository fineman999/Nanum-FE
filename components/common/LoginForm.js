import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState, userState } from "../../state/atom/authState";

import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { pink } from "@mui/material/colors";
import styles from "../../styles/LoginForm.module.css";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from "../../lib/apis/login";
import Image from "next/image";
import { useRouter } from "next/router";
import { fireAlert } from "./Alert";
import { getUserDetail, postLogin } from "../../lib/apis/auth";

const LoginForm = () => {
  const [userInput, setUserInput] = useState({ email: "", pwd: "" });
  const [authData, setAuthData] = useRecoilState(authState);
  const [userData, setUserData] = useRecoilState(userState);
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const STORED_ID = localStorage.getItem("stored_id");
    if (STORED_ID) {
      setIsChecked(true);
      setUserInput({
        ...userInput,
        email: STORED_ID,
      });
    }
  }, [isChecked]);

  // 아이디 저장
  const handleCheck = () => {
    if (isChecked) {
      // 저장된 아이디 삭제
      localStorage.removeItem("stored_id");
    } else {
      localStorage.setItem("stored_id", userInput.email);
    }

    setIsChecked(!isChecked);
  };

  const handleChange = (e) => {
    if (isChecked && e.target.name === "email") {
      localStorage.setItem("stored_id", e.target.value);
    }

    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const goLogin = (e) => {
    e.preventDefault();
    if (userInput.email && userInput.pwd) {
      console.log(userInput);
      postLogin(userInput)
        .then((res) => {
          const userId = res.data.result.userId;
          localStorage.setItem("accessToken", res.data.result.accessToken);
          sessionStorage.setItem("userId", res.data.result.userId);
          sessionStorage.setItem("role", res.data.result.role);
          fireAlert({ icon: "success", title: "로그인 성공하였습니다." });
          setAuthData({ isLogin: true });
          getUserDetail({ userId })
            .then((Res) => {
              setUserData(Res.data.result);
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
    <div className={styles.login_form_wrapper}>
      <form className={styles.login_form}>
        <input
          type="text"
          name="email"
          value={userInput.email || ""}
          className={styles.email_inp}
          placeholder="아이디"
          autoComplete="off"
          onChange={handleChange}
        />

        <input
          type="password"
          name="pwd"
          value={userInput.pwd || ""}
          className={styles.password_inp}
          placeholder="비밀번호"
          autoComplete="off"
          onChange={handleChange}
        />

        <div className={styles.login_form_check}>
          {isChecked ? (
            <CheckCircleIcon
              sx={{ marginRight: "5px", color: pink[500] }}
              onClick={handleCheck}
              fontSize="small"
            />
          ) : (
            <CheckCircleOutlineIcon
              sx={{ marginRight: "5px", color: pink[500] }}
              onClick={handleCheck}
              fontSize="small"
            />
          )}
          아이디저장
        </div>

        <div className={styles.login_form_btn_area}>
          <button className={styles.login_btn} onClick={goLogin}>
            로그인
          </button>
        </div>

        <div className={styles.login_form_support}>
          <Link href="/find-account">
            <a>아이디 찾기</a>
          </Link>
          <Link href="/find-account/pw">
            <a className={styles.find_password}>비밀번호 찾기</a>
          </Link>
          <Link href="/signup/check">
            <a className={styles.signup}>회원가입</a>
          </Link>
        </div>

        <ul className={styles.sns_login}>
          <li>
            <Link href={KAKAO_AUTH_URL}>
              <a className={styles.icon_btn}>
                <span className="icon_area">
                  <span className={styles.icon_kakao}>
                    <Image
                      src="/images/kakao.png"
                      alt="sns_icon"
                      layout="fill"
                    />
                  </span>
                </span>
                <span className={styles.icon_name}>카카오</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={GOOGLE_AUTH_URL}>
              <a className={styles.icon_btn}>
                <span className="icon_area">
                  <span className={styles.icon_google}>
                    <Image
                      src="/images/google.png"
                      alt="sns_icon"
                      layout="fill"
                    />
                  </span>
                </span>
                <span className={styles.icon_name}>구글</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={NAVER_AUTH_URL}>
              <a className={styles.icon_btn}>
                <span className="icon_area">
                  <span className={styles.icon_naver}>
                    <Image
                      src="/images/naver.png"
                      alt="sns_icon"
                      layout="fill"
                    />
                  </span>
                </span>
                <span className={styles.icon_name}>네이버</span>
              </a>
            </Link>
          </li>
        </ul>

        <div className={styles.non_member_area}>
          <Link href="/">
            <a className={styles.non_member_btn}>
              <span>홈으로</span>
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
