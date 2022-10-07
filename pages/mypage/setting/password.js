import { useRouter } from "next/router";
import { useState } from "react";
import css from "styled-jsx/css";
import { fireAlert } from "../../../components/common/Alert";
import Header from "../../../components/common/Header";
import { getOriginPw, putPassword } from "../../../lib/apis/auth";
const style = css`
  #password {
    padding: 12rem 2rem;
  }
  #pw_header h2 {
    margin-bottom: 2rem;
  }
  #pw_header {
    margin-bottom: 2rem;
  }
  article {
    margin-top: 1rem;
  }
  label {
    color: #76c1b2;
    font-weight: bold;
    margin-left: 0.5rem;
  }
  input {
    box-sizing: border-box;
    border: 2px #76c1b2 solid;
    border-radius: 30px;
    width: 100%;
    height: 4vh;
    padding: 1rem;
    font-size: 1.125rem;
    margin-bottom: 0.2rem;
  }
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
    cursor: pointer;
    width: 12vh;
    margin: 3rem 0.5rem;
  }
  #btn_list {
    text-align: center;
  }
  .warn {
    color: rgb(240, 90, 90);
    padding-left: 0.5rem;
  }
  .collect {
    color: green;
    padding-left: 0.5rem;
  }
`;
export default function Password() {
  const router = useRouter();
  //유효성 검사
  const [pwTest, setPwTest] = useState(false);
  const [newPwConfirm, setNewPwConfirm] = useState(false);
  const [pwConfirm, setPwConfirm] = useState(false);
  //입력값
  const [newPw, setNewPw] = useState("");
  const [pwd, setPwd] = useState("");
  const [newPwInput, setNewPwInput] = useState("");

  const userId = 0;

  //비밀번호 유효성 검사
  const checkPw = (e) => {
    var regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,20}$/;
    setPwTest(regExp.test(e.target.value));
    setNewPw(e.target.value);
  };

  //비밀번호 확인 일치 검사
  const checkPwConfirm = (e) => {
    if (e.target.value === newPw) {
      setNewPwConfirm(true);
    } else {
      setNewPwConfirm(false);
    }
    setNewPwInput(e.target.value);
  };

  //기존 비밀번호 일치
  const checkOriginPw = () => {
    getOriginPw({ userId, pwd })
      .then((res) => {
        setPwConfirm(true), console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setPwConfirm(false);
      });
  };
  const changePw = () => {
    if (pwd === newPw) {
      fireAlert({
        icon: "warning",
        title: "기존 비밀번호와 동일해요.",
      });
    } else {
      putPassword({ userId, newPw })
        .then((res) => {
          console.log(res);
          fireAlert({
            icon: "success",
            title: "성공적으로 비밀번호가 변경됐어요",
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div id="password">
        <Header title="비밀번호" type="pw" />
        <section id="pw_header">
          <h2>비밀번호 변경</h2>
          <h4>계정 보호를 위해 주기적으로</h4>
          <h4>비밀번호를 교체해주세요</h4>
        </section>
        <section id="change_pw_form">
          <article id="old_pw_htmlForm">
            <label htmlFor="pw">기존 비밀번호</label>
            <input
              type="password"
              id="pw"
              placeholder="기존 비밀번호를 입력해주세요."
              onChange={() => setPwd(e.target.value)}
              // onBlur={checkOriginPw}
            />
            {pwd == "" ? (
              <></>
            ) : (
              <>
                {pwConfirm ? (
                  <></>
                ) : (
                  <span className="warn">기존 비밀번호가 틀렸어요!</span>
                )}
              </>
            )}
          </article>
          <article id="new_pw_htmlForm">
            <label htmlFor="pw">변경할 비밀번호</label>
            <input
              type="password"
              id="pw"
              // placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
              onChange={checkPw}
              disabled={!pwConfirm}
            />
            {newPw == "" ? (
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
          <article id="new_pwCheck_htmlForm">
            <label htmlFor="pw">변경할 비밀번호 확인</label>
            <input
              type="password"
              id="pw"
              // placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
              onChange={checkPwConfirm}
              disabled={!pwConfirm}
            />
            {newPwInput == "" ? (
              <></>
            ) : (
              <>
                {newPwConfirm ? (
                  <span className="collect">비밀번호가 일치합니다.</span>
                ) : (
                  <span className="warn">비밀번호가 맞지 않아요.</span>
                )}
              </>
            )}
          </article>
        </section>
        <section id="btn_list">
          <button onClick={changePw}>확인</button>
          <button
            style={{ backgroundColor: "#777777" }}
            onClick={() => {
              router.back();
            }}
          >
            뒤로가기
          </button>
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
