import { useRouter } from "next/router";
import { useRef, useState } from "react";
import css from "styled-jsx/css";
import { fireAlert } from "../../components/common/Alert";

import * as Api from "../../lib/apis/apiClient";
import axios from "axios";
import SubHeader from "../../components/common/SubHeader";
import {
  findEmailValid,
  findIdByPhone,
  getEmail,
  postFindEmail,
  postPhone,
  putPassword,
} from "../../lib/apis/auth";
import Slide from "@mui/material/Slide";
const style = css`
  #signup {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 92.5vh;
    padding: 2rem 0rem;
  }
  #signup_innercontainer {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    color: #76c1b2;
    font-weight: bold;
    margin-left: 0.5rem;
    font-size: 1.125rem;
  }
  input {
    box-sizing: border-box;
    border: 2px #76c1b2 solid;
    border-radius: 30px;
    width: 100%;
    height: 4vh;
    padding: 1rem;
    font-size: 1.125rem;
  }
  /* input[type="password"] {
    font-size: 3rem;
  } */
  input::placeholder {
    font-size: 0.8rem !important;
    font-weight: initial;
    text-shadow: none;
    letter-spacing: -1px;
  }
  input:focus::placeholder {
    color: transparent;
  }
  button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1rem;
    /* margin-bottom: 1.125rem; */
    cursor: pointer;
    width: 100%;
  }
  #signup_htmlForm {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    overflow: unset;
  }
  #signup_htmlForm h1,
  article {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #btn_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0 1rem;
  }
  #signup_header {
    text-align: center;
  }
  #signup_header h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: -1px;
    color: #76c1b2;
  }
  h2 {
    text-align: center;
  }
  #signup_btn {
    font-size: 1.35rem;
    padding: 0.5rem 2rem;
    min-width: 250px;
    margin-bottom: 20px;
  }
  #back_to_btn {
    background-color: #777777;
    font-size: 1.35rem;
    padding: 0.5rem 2rem;
    min-width: 250px;
    margin-bottom: 0;
  }
  #preview_profile {
    margin: 0px;
    width: 50%;
  }
  .selectBox {
    position: relative;
    width: 20vh;
    height: 4vh;
    border-radius: 30px;
    border: 2px solid #76c1b2;
    margin-bottom: 1rem;
  }
  .selectBox .select {
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0 1rem;
    position: relative;
    z-index: 3;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  .selectBox .select option {
    background: #76c1b2;
    color: #fff;
    padding: 3px 0;
    font-size: 16px;
  }
  .selectBox .icoArrow {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 35px;
    height: inherit;
    border-left: 2px solid #76c1b2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selectBox .icoArrow img {
    width: 50%;
    transition: 0.3s; // 부드럽게 회전
  }

  .selectBox .select:focus + .icoArrow img {
    transform: rotate(180deg);
  }
  article span {
    padding: 2px 0.5rem;
  }
  .warn {
    color: rgb(240, 90, 90);
  }
  .collect {
    color: green;
  }
  .collect_blue {
    color: blue;
  }
  .input-file-button {
    padding: 0.4rem 1rem;
    width: 60%;
    text-align: center;
    background-color: #76c1b2;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    margin: 0;
    font-size: 1rem;
  }
  #preview_profile img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
`;

export default function Account() {
  const router = useRouter();
  const [title, setTitle] = useState(`비밀번호를 잃어버리셨나요?`);
  const [subTitle, setSubTitle] = useState(
    `NANUM에 가입한 이메일을 정확히 입력해 주세요.`
  );
  const [validCheck, setValidCheck] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [numValid, setNumValid] = useState(0);
  const [phoneExist, setPhoneExist] = useState(true);
  const phoneRef = useRef();
  const [phone, setPhone] = useState("");
  const [emailSuccessValid, setEmailSuccessValid] = useState(false);
  const [email, setEmail] = useState("");

  //유효성 검사
  const [emailTest, setEmailTest] = useState(false);

  //이메일 중복 검사
  const [emailValid, setEmailValid] = useState(false);
  const [userId, setUserId] = useState(0);
  // 비밀번호

  const [pwTest, setPwTest] = useState(false);
  const [pwConfirmTest, setPwConfirmTest] = useState(false);
  const [pwInfo, setPwInfo] = useState({
    pw: "",
    pwConfirm: "",
  });
  //이메일 유효성 검사
  const checkEmail = (e) => {
    var regExp =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmailTest(regExp.test(e.target.value));
    setEmail(e.target.value);
  };
  //이메일 중복체크
  const checkEmailValid = () => {
    if (emailTest) {
      findEmailValid(email)
        .then((res) => {
          if (res.status == 200) {
            setEmailValid(true);
            setTitle("해당 이메일이 존재합니다.");
            setSubTitle("휴대전화 번호를 입력해주세요.");
          }
          if (res.status == 204) {
            setEmailValid(false);
            fireAlert({
              icon: "error",
              title:
                "해당 이메일은 회원가입을 하지 않았습니다. 다시 입력해주세요.",
            });
          }
        })
        .catch((err) => {
          setEmailValid(false);
          fireAlert({
            icon: "error",
            title:
              "해당 이메일은 회원가입을 하지 않았습니다. 다시 입력해주세요.",
          });
        });
    }
  };
  const handlePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }
      result += value[i];
    }
    phoneRef.current.value = result;
    setPhone(e.target.value);
  };

  //인증번호 발송
  const postPhoneCheck = () => {
    let phoneValue = phone.split("-");
    if (phoneValue.length !== 3) {
      fireAlert({
        icon: "error",
        title: "휴대전화가 잘못 입력되었어요. 다시 입력해주세요.",
      });
      return;
    }
    phoneValue = phoneValue[0] + phoneValue[1] + phoneValue[2];
    fireAlert({
      icon: "info",
      title: "인증번호가 전송되었습니다.",
    });
    postPhone(phoneValue)
      .then((res) => {
        setTitle("인증번호를 입력해주세요.");
        setSubTitle("");
        setValidCheck(true);
      })
      .catch((err) => {
        fireAlert({
          icon: "error",
          title: "인증번호 실패.",
        });
      });
  };

  //인증 번호 일치 확인
  const checkNum = () => {
    let phoneValue = phone.split("-");
    if (phoneValue.length !== 3) {
      fireAlert({
        icon: "error",
        title: "휴대전화가 잘못 입력되었어요. 다시 입력해주세요.",
      });
      return;
    }

    phoneValue = phoneValue[0] + phoneValue[1] + phoneValue[2];
    const content = numValid;
    findIdByPhone({ phoneNumber: phoneValue, content: numValid })
      .then((res) => {
        if (res.status === 200) {
          setPhoneValid(true);
          setPhoneExist(true);
          setEmailSuccessValid(true);
          setTitle("인증한 휴대폰 번호로 가입된 계정입니다.");
          setSubTitle("새로운 비밀번호를 입력해주세요");
          setUserId(Number(res.data));

          setTitle("인증한 휴대폰 번호로 가입된 계정입니다.");
        } else if (res.status === 208) {
          setPhoneExist(false);
          fireAlert({
            icon: "error",
            title: "인증 번호가 틀렸어요. 확인 후 입력해주세요.",
          });
        } else {
          setPhoneValid(false);
          fireAlert({
            icon: "error",
            title: "인증 번호가 틀렸어요. 확인 후 입력해주세요.",
          });
        }
      })
      .catch((err) => {
        setPhoneValid(false);
        fireAlert({
          icon: "error",
          title: "인증 번호가 틀렸어요. 확인 후 입력해주세요.",
        });
      });
  };

  //비밀번호 유효성 검사
  const checkPw = (e) => {
    var regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,20}$/;
    setPwTest(regExp.test(e.target.value));
    setPwInfo(() => ({ ...pwInfo, pw: e.target.value }));
  };

  //비밀번호 확인 유효성 검사
  const checkPwConfirm = (e) => {
    if (e.target.value === pwInfo.pw) {
      setPwConfirmTest(true);
    } else {
      setPwConfirmTest(false);
    }
    setPwInfo(() => ({ ...pwInfo, pwConfirm: e.target.value }));
  };
  const handleChangePw = () => {
    if (pwInfo.pw === pwInfo.pwConfirm) {
      putPassword({ userId: userId, newPw: pwInfo.pw })
        .then((res) => {
          if (res.status === 200) {
            fireAlert({
              icon: "success",
              title:
                "성공적으로 비밀번호 값이 변경되었습니다. 다시 로그인해주세요.",
            });
            router.push("/login");
          } else {
            fireAlert({
              icon: "error",
              title: "비밀번호 변경 실패.",
            });
          }
        })
        .catch((res) => {
          fireAlert({
            icon: "error",
            title: "비밀번호 변경 실패!",
          });
        });
    } else {
      fireAlert({
        icon: "error",
        title: "비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요.",
      });
    }
  };
  return (
    <>
      <SubHeader title="비밀번호 찾기" type="find-account/pw" />
      <div id="signup">
        <div id="signup_innercontainer">
          <section id="signup_header">
            <h1 style={{ marginBottom: "2rem" }}>NANUM</h1>
          </section>
          <section id="signup_header_text" style={{ textAlign: "center" }}>
            <h2>{title}</h2>
            <h2>{subTitle}</h2>
          </section>
          <section id="signup_htmlForm">
            <article id="email_htmlForm">
              <label htmlFor="email" style={{ marginBottom: "1rem" }}>
                이메일
              </label>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="이메일을 입력해주세요."
                  maxLength="50"
                  onChange={checkEmail}
                  style={{ width: "60%" }}
                  disabled={emailValid}
                />
                <button
                  style={{ width: "40%" }}
                  onClick={checkEmailValid}
                  disabled={emailValid}
                >
                  메일 확인하기
                </button>
              </div>
              {email == "" ? (
                <></>
              ) : (
                <>
                  {emailTest ? (
                    <>
                      {emailValid ? (
                        <span className="collect">존재하는 이메일입니다.</span>
                      ) : (
                        <span className="collect_blue">
                          이메일 양식에 맞습니다.
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="warn">이메일 형식에 맞춰주세요.</span>
                  )}
                </>
              )}
            </article>
            <Slide direction="left" in={emailValid} mountOnEnter unmountOnExit>
              <article id="tel">
                <label htmlFor="tel" style={{ marginBottom: "1rem" }}>
                  휴대전화
                </label>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <input
                    type="tel"
                    id="tel"
                    placeholder="숫자로만 입력하세요."
                    ref={phoneRef}
                    style={{ marginRight: "5px", width: "60%" }}
                    onChange={handlePhone}
                    value={phone}
                    disabled={emailSuccessValid}
                  />
                  <button
                    style={{ width: "40%" }}
                    onClick={postPhoneCheck}
                    disabled={emailSuccessValid}
                  >
                    인증번호 받기
                  </button>
                </div>
                <Slide
                  direction="left"
                  in={validCheck}
                  mountOnEnter
                  unmountOnExit
                >
                  <div style={{ display: "flex", width: "100%" }}>
                    <input
                      type="text"
                      id="telCheck"
                      placeholder="인증번호를 입력하세요."
                      onChange={(e) => setNumValid(e.target.value)}
                      disabled={emailSuccessValid}
                    />
                    <button
                      style={{ width: "40%", marginLeft: "0.5rem" }}
                      onClick={checkNum}
                      disabled={emailSuccessValid}
                    >
                      확인
                    </button>
                  </div>
                </Slide>

                {numValid ? (
                  <>
                    {phoneValid ? (
                      <span className="collect">인증되었습니다.</span>
                    ) : (
                      <span className="warn">
                        {phoneExist
                          ? "인증번호가 맞지 않아요."
                          : "이미 가입되신 전화번호입니다."}
                      </span>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </article>
            </Slide>
          </section>
          <Slide
            direction="left"
            in={userId > 0 ? true : false}
            mountOnEnter
            unmountOnExit
          >
            <article>
              <article id="pw_htmlForm">
                <label htmlFor="pw">비밀번호</label>
                <input
                  type="password"
                  id="pw"
                  placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
                  onChange={checkPw}
                />
                {pwInfo.pw == "" ? (
                  <></>
                ) : (
                  <>
                    {pwTest ? (
                      <span className="collect">
                        사용할 수 있는 비밀번호입니다.
                      </span>
                    ) : (
                      <span className="warn">
                        8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
                      </span>
                    )}
                  </>
                )}
              </article>
              <article id="pwCheck_htmlForm">
                <label htmlFor="pwCheck">비밀번호 확인</label>
                <input
                  type="password"
                  id="passwordConfirmation"
                  placeholder="비밀번호를 다시 입력해주세요."
                  onChange={checkPwConfirm}
                />
                {pwInfo.pwConfirm == "" ? (
                  <></>
                ) : (
                  <>
                    {pwConfirmTest ? (
                      <span className="collect">비밀번호가 일치합니다.</span>
                    ) : (
                      <span className="warn">비밀번호가 맞지 않아요.</span>
                    )}
                  </>
                )}
              </article>
              <article id="btn_container">
                <button id="signup_btn" onClick={handleChangePw}>
                  비밀번호 변경
                </button>
              </article>
            </article>
          </Slide>
          {/* <Slide
            direction="left"
            in={emailSuccessValid}
            mountOnEnter
            unmountOnExit
          >
            <article id="btn_container">
              <h1 style={{ marginBottom: "2rem" }}>{email}</h1>
              <button id="signup_btn" onClick={() => router.push("/login")}>
                로그인
              </button>
            </article>
          </Slide> */}
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
