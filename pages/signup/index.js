import { useRouter } from "next/router";
import { useRef, useState } from "react";
import css from "styled-jsx/css";
import { fireAlert } from "../../components/common/Alert";
import {
  postSignup,
  getEmail,
  getNickname,
  postPhone,
  postPhoneValid,
} from "../../lib/apis/auth";
import * as Api from "../../lib/apis/apiClient";
import axios from "axios";
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
    width: 350px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #signup_htmlForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 1.5rem;
    overflow: unset;
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
    width: 90%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 1.5rem;
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

  #signup_header h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: -1px;
    color: #76c1b2;
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

export default function Signup() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState("");
  const phoneRef = useRef();

  //유저정보
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    pwConfirm: "",
    nickname: "",
    phone: "",
    sex: "",
    imgFile: {},
  });

  //유효성 검사
  const [emailTest, setEmailTest] = useState(false);
  const [pwTest, setPwTest] = useState(false);
  const [pwConfirmTest, setPwConfirmTest] = useState(false);
  const [nameTest, setNameTest] = useState(false);

  //이메일 중복 검사
  const [emailValid, setEmailValid] = useState(true);

  //닉네임 중복 검사
  const [nameValid, setNameValid] = useState(true);

  //휴대폰 인증 검사
  const [phoneValid, setPhoneValid] = useState(false);

  //휴대폰 인증 번호 일치 검사
  const [numValid, setNumValid] = useState(0);

  //이메일 유효성 검사
  const checkEmail = (e) => {
    var regExp =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmailTest(regExp.test(e.target.value));
    setUserInfo(() => ({
      ...userInfo,
      email: e.target.value,
    }));
  };

  //이메일 중복체크
  const checkEmailValid = () => {
    getEmail(userInfo.email)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setEmailValid(true);
        }
        if (res.status == 204) {
          setEmailValid(false);
        }
      })
      .catch((err) => {
        setEmailValid(false);
      });
  };

  //비밀번호 유효성 검사
  const checkPw = (e) => {
    var regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,20}$/;
    setPwTest(regExp.test(e.target.value));
    setUserInfo(() => ({ ...userInfo, password: e.target.value }));
  };

  //비밀번호 확인 유효성 검사
  const checkPwConfirm = (e) => {
    if (e.target.value === userInfo.password) {
      setPwConfirmTest(true);
    } else {
      setPwConfirmTest(false);
    }
    setUserInfo(() => ({ ...userInfo, pwConfirm: e.target.value }));
  };

  //닉네임 유효성 검사
  const checkName = (e) => {
    if (e.target.value.length >= 2 && e.target.value.length <= 10) {
      setNameTest(true);
    } else {
      setNameTest(false);
    }
    setUserInfo(() => ({ ...userInfo, nickname: e.target.value }));
  };

  //닉네임 중복 체크
  const checkNameValid = () => {
    getNickname(userInfo.nickname)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setNameValid(true);
        }
        if (res.status == 204) {
          setNameValid(false);
        }
      })
      .catch((err) => {
        setNameValid(false);
      });
  };

  //휴대폰 - 자동 입력
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
    setUserInfo(() => ({ ...userInfo, phone: e.target.value }));
  };

  //성별 선택
  const handleSex = (e) => {
    setUserInfo(() => ({ ...userInfo, sex: e.target.value }));
  };

  //이미지 미리보기
  const encodeFileToBase64 = (fileBob) => {
    setUserInfo(() => ({ ...userInfo, imgFile: fileBob }));
    const reader = new FileReader();
    reader.readAsDataURL(fileBob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  //인증번호 발송
  const postPhoneCheck = () => {
    let phone = userInfo.phone.split("-");
    phone = phone[0] + phone[1] + phone[2];
    console.log(phone);
    postPhone(phone)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fireAlert({
      icon: "success",
      title: "입력하신 번호로 인증번호가 발송 되었습니다.",
    });
  };

  //인증 번호 일치 확인
  const checkNum = () => {
    let phone = userInfo.phone.split("-");
    phone = phone[0] + phone[1] + phone[2];
    const number = numValid;
    console.log(phone, number);
    postPhoneValid({ phone, number })
      .then((res) => {
        console.log(res);
        setPhoneValid(true);
      })
      .catch((err) => {
        console.log(err);
        setPhoneValid(false);
        fireAlert({
          icon: "error",
          title: "인증 번호가 틀렸어요. 확인 후 입력해주세요.",
        });
      });
  };

  //회원가입하기
  const postSign = async () => {
    let myPhone = userInfo.phone.split("-");
    myPhone = myPhone[0] + myPhone[1] + myPhone[2];
    const userRequest = {
      email: userInfo.email,
      pwd: userInfo.password,
      nickname: userInfo.nickname,
      role: router.query.role,
      phone: myPhone,
      gender: userInfo.sex,
    };

    if (
      // true
      emailTest &&
      nameTest &&
      pwTest &&
      pwConfirmTest &&
      // phoneValid &&
      nameValid &&
      emailValid &&
      userInfo.sex
    ) {
      const formData = new FormData();
      await formData.append("profileImg", userInfo.imgFile);
      const uploaderString = JSON.stringify(userRequest);
      formData.append(
        "userRequest",
        new Blob([uploaderString], { type: "application/json" })
      );

      const res = await axios.post(
        "https://nanum.site/user-service/api/v1/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res.status == 201) {
        fireAlert({
          icon: "success",
          title: "축하합니다! 회원가입이 성공했습니다.",
        });
      } else {
        fireAlert({
          icon: "error",
          title: "회원가입에 실패했습니다.",
        });
      }
    } else {
      fireAlert({ icon: "warning", title: "입력을 확인해주세요." });
    }
  };

  return (
    <>
      <div id="signup">
        <div id="signup_innercontainer">
          <section id="signup_header">
            <h1>NANUM</h1>
          </section>
          <section id="signup_htmlForm">
            <article id="email_htmlForm">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                maxLength="50"
                onChange={checkEmail}
                onBlur={checkEmailValid}
              />
              {userInfo.email == "" ? (
                <></>
              ) : (
                <>
                  {emailTest ? (
                    <>
                      {" "}
                      {emailValid ? (
                        <span className="collect">
                          사용가능한 이메일입니다.
                        </span>
                      ) : (
                        <span className="warn">사용중인 이메일이에요.</span>
                      )}
                    </>
                  ) : (
                    <span className="warn">이메일 형식에 맞춰주세요.</span>
                  )}
                </>
              )}
            </article>
            <article id="nickname_htmlForm">
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                placeholder="닉네임은 2자 이상, 10자 이하입니다."
                onChange={checkName}
                onBlur={checkNameValid}
              />
              {userInfo.nickname == "" ? (
                <></>
              ) : (
                <>
                  {nameTest ? (
                    <>
                      {" "}
                      {nameValid ? (
                        <span className="collect">
                          사용가능한 닉네임입니다.
                        </span>
                      ) : (
                        <span className="warn">사용중인 닉네임이에요..</span>
                      )}
                    </>
                  ) : (
                    <span className="warn">
                      {" "}
                      닉네임은 2자 이상, 10자 이하입니다.
                    </span>
                  )}
                </>
              )}
            </article>
            <article id="pw_htmlForm">
              <label htmlFor="pw">비밀번호</label>
              <input
                type="password"
                id="pw"
                placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
                onChange={checkPw}
              />
              {userInfo.password == "" ? (
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
              {userInfo.pwConfirm == "" ? (
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
            <article id="tel">
              <label htmlFor="tel">휴대전화</label>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  justifyContent: "space-around",
                }}
              >
                <input
                  type="tel"
                  id="tel"
                  placeholder="숫자로만 입력하세요."
                  ref={phoneRef}
                  style={{ marginRight: "5px" }}
                  onChange={handlePhone}
                  value={userInfo.phone}
                />
                <button style={{ width: "80%" }} onClick={postPhoneCheck}>
                  {" "}
                  인증번호 받기
                </button>
              </div>
              <input
                type="text"
                id="telCheck"
                placeholder="인증번호를 입력하세요."
                onChange={(e) => setNumValid(e.target.value)}
                onBlur={checkNum}
              />
              {numValid ? (
                <>
                  {" "}
                  {phoneValid ? (
                    <span className="collect">인증되었습니다.</span>
                  ) : (
                    <span className="warn">인증번호가 맞지 않아요.</span>
                  )}
                </>
              ) : (
                <></>
              )}
            </article>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <div className="selectBox">
                  <select
                    name="sex"
                    className="select"
                    onChange={handleSex}
                    defaultValue="default"
                  >
                    <option disabled value="default">
                      성별
                    </option>
                    <option value="F">여자</option>
                    <option value="M">남자</option>
                  </select>
                  <span className="icoArrow">
                    <img src="/icons/arrow.png" alt="arrow" />
                  </span>
                </div>
                <article id="profile_htmlForm" style={{ marginBottom: "0" }}>
                  <label htmlFor="profileImg">프로필 사진</label>
                  <label className="input-file-button" htmlFor="input-file">
                    이미지 업로드
                  </label>
                  <input
                    type="file"
                    id="input-file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => {
                      encodeFileToBase64(e.target.files[0]);
                    }}
                  />
                </article>
              </div>
              <article id="preview_profile">
                {imageSrc ? (
                  <img src={imageSrc} alt="preview_img" />
                ) : (
                  <img
                    src="/images/default.png"
                    alt="default IMG"
                    style={{ alignSelf: "flex-end" }}
                  />
                )}
              </article>
            </div>
            <article id="btn_container">
              <button id="signup_btn" onClick={postSign}>
                회원가입
              </button>
              <button id="back_to_btn" onClick={() => router.back()}>
                취소
              </button>
            </article>
          </section>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
