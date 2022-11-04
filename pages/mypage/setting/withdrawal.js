import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import css from "styled-jsx/css";
import { fireAlert } from "../../../components/common/Alert";
import Header from "../../../components/common/Header";
import { getUserDetail } from "../../../lib/apis/auth";
import { userState } from "../../../state/atom/authState";
const style = css`
  #password {
    padding: 12rem 2rem;
  }
  #pw_header h2 {
    margin-bottom: 2rem;
  }
  #pw_header h4 {
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
    width: 14vh;
    margin: 3rem 0.5rem 0.5rem;
  }
  #btn_list {
    text-align: center;
  }
`;
export default function Withdrawal() {
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(userState);
  const handleOut = () => {
    fireAlert({
      icon: "warning",
      title: "아직 테스트 단계입니다. 회원탈퇴는 불가합니다.",
    });
  };

  return (
    <>
      <div id="password">
        <Header title="마이페이지" type="pw" />
        <section id="pw_header">
          <h2>회원 탈퇴</h2>
          <h4>지금까지 나눔 서비스를 이용해주셔서 감사합니다</h4>
          <h4>
            나눔서비스 탈퇴 시 계정정보와 모든 기록이 삭제되며, 복구할 수 없으니
            신중히 탈퇴해주세요!
          </h4>
        </section>
        <section id="change_pw_form">
          <article id="email">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled
              placeholder="이메일을 입력해주세요."
            />
          </article>
          <article id="new_pw_htmlForm">
            <label htmlFor="pw">비밀번호</label>
            <input
              type="password"
              id="pw"
              placeholder="비밀번호를 입력해주세요."
            />
          </article>
        </section>
        <section id="btn_list">
          <button style={{ backgroundColor: "#777777" }} onClick={handleOut}>
            회원 탈퇴
          </button>
          <button onClick={() => router.back()}>취소</button>
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
