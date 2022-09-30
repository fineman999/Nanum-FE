import { useRouter } from "next/router";
import { useState } from "react";
import css from "styled-jsx/css";

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
export default function SignUpCheck() {
  const router = useRouter();
  const [userType, setUserType] = useState(0);

  return (
    <>
      <div id="signup_check">
        <section id="check_header">
          <h1>당신은</h1>
          <h1>누구십니까?</h1>
        </section>
        <section id="choose">
          <article id="host_check" onClick={() => setUserType(1)}>
            <h3>호스트</h3>
            <p>나의 멋진 집을 올려봐요</p>
            <img src="/images/default.png" alt="host_image" />
            {userType === 1 ? (
              <>
                <div id="checked"></div>
                <img
                  src="/images/check.png"
                  style={{ width: "100%", position: "absolute" }}
                  alt="check"
                />
              </>
            ) : (
              <></>
            )}
          </article>
          <hr />
          <article id="user_check" onClick={() => setUserType(2)}>
            <h3>세입자</h3>
            <p>살고 싶은 집을 찾아봐요</p>
            <img src="/images/default.png" alt="user_image" />
            {userType === 2 ? (
              <>
                <div id="checked"></div>
                <img
                  src="/images/check.png"
                  style={{ width: "100%", position: "absolute" }}
                  alt="check"
                />
              </>
            ) : (
              <></>
            )}
          </article>
        </section>
        <section id="btn">
          <button id="back_btn" onClick={() => router.back()}>
            취소
          </button>

          <button id="next_btn" onClick={() => router.push("/signup")}>
            다음
          </button>
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
