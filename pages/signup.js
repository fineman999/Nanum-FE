import css from "styled-jsx/css";

const style = css`
  #signup {
    background-color: #edf1f1;
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
`;
export default function Signup() {
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
                placeholder="이메일을 입력해주세요."
              />
            </article>
            <article id="nickname_htmlForm">
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                placeholder="닉네임은 2자 이상,10자 이하입니다."
              />
            </article>
            <article id="pw_htmlForm">
              <label htmlFor="pw">비밀번호</label>
              <input
                type="password"
                id="pw"
                placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
              />
            </article>
            <article id="pwCheck_htmlForm">
              <label htmlFor="pwCheck">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirmation"
                placeholder="비밀번호를 다시 입력해주세요."
              />
            </article>
            <article id="tel">
              <label htmlFor="tel">휴대전화</label>
              <input type="text" placeholder="대한민국 +82" />
              <div
                style={{
                  display: "flex",
                  margin: "10px 0px",
                  justifyContent: "space-around",
                }}
              >
                <input
                  type="text"
                  id="tel"
                  placeholder="휴대전화 번호를 입력하세요."
                  style={{ marginRight: "5px" }}
                />
                <button style={{ width: "80%" }}> 인증번호 받기</button>
              </div>
              <input
                type="text"
                id="telCheck"
                placeholder="인증번호를 입력하세요."
              />
            </article>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <article id="sex_htmlForm">
                  <label htmlFor="sex">성별</label>
                  <input type="text" placeholder="성별"></input>
                </article>
                <article id="profile_htmlForm">
                  <label htmlFor="profileImg">프로필 사진</label>
                  <button style={{ width: "80%" }}>이미지 업로드</button>
                </article>
              </div>
              <article id="preview_profile">
                <img
                  src="/images/default.png"
                  alt="default IMG"
                  style={{ alignSelf: "flex-end" }}
                />
              </article>
            </div>
            <article id="btn_container">
              <button id="signup_btn">회원가입</button>
              <button id="back_to_btn">취소</button>
            </article>
          </section>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
