import { useRouter } from "next/router";
import css from "styled-jsx/css";
import Header from "../../../components/common/Header";
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
    margin-bottom: 1rem;
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
`;
export default function Password() {
  const router = useRouter();
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
              placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
            />
          </article>
          <article id="new_pw_htmlForm">
            <label htmlFor="pw">변경할 비밀번호</label>
            <input
              type="password"
              id="pw"
              placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
            />
          </article>
          <article id="new_pwCheck_htmlForm">
            <label htmlFor="pw">변경할 비밀번호 확인</label>
            <input
              type="password"
              id="pw"
              placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
            />
          </article>
        </section>
        <section id="btn_list">
          <button>확인</button>
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
