import css from "styled-jsx/css";
import Header from "../../../components/common/Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";

const style = css`
  #setting {
    padding: 5rem 2rem;
  }
  #setting_header h2 {
    margin-bottom: 2rem;
  }
  #second_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  #setting_profile {
    text-align: center;
    margin-bottom: 1rem;
  }
  #setting_profile img {
    width: 15vh;
    height: 15vh;
    border-radius: 100%;
    margin-bottom: 0.5rem;
  }
  #setting_body h4 {
    margin-bottom: 0.5rem;
  }
  #setting_body p {
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
  button {
    background-color: red;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    margin-top: 2rem;
  }
  #btn {
    text-align: center;
  }
`;
export default function Setting() {
  const router = useRouter();
  const user = {
    userName: "노숙자",
    date: "2022.01.01",
    email: "test@test.com",
    phone: "010-1234-1234",
    mail: true,
    sex: 0,
  };

  const [mailAccept, setMailAccept] = useState(user.mail);
  const [sex, setSex] = useState(user.sex);
  const handleMailAccept = (event) => {
    setMailAccept(event.target.value);
  };
  const handleSex = (event) => {
    setSex(event.target.value);
  };

  return (
    <>
      <div id="setting">
        <Header title="마이페이지" type="mypage" />
        <section id="setting_header">
          <h2>설정</h2>
          <div id="second_header">
            <h4>계정 정보</h4>
            <h4 style={{ color: "red" }}>로그아웃</h4>
          </div>
        </section>
        <section id="setting_profile">
          <img src="/images/default.png" />
          <h2 style={{ marginBottom: "0.5rem" }}>{user.userName}</h2>
          <p style={{ marginBottom: "0.5rem" }}>가입일 {user.date}</p>
          <hr />
        </section>
        <section id="setting_body">
          <h4>이메일</h4>
          <p>{user.email}</p>
          <h4>비밀번호</h4>
          <p
            style={{ color: "#415ffc", cursor: "pointer" }}
            onClick={() => {
              router.push("setting/password");
            }}
          >
            비밀번호 변경하기
          </p>
          <h4>휴대전화</h4>
          <p>{user.phone}</p>
          <FormControl id="sex">
            <FormLabel id="demo-controlled-radio-buttons-group">
              <h4 style={{ color: "black", marginBottom: "0" }}>성별</h4>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={sex}
              onChange={handleSex}
              style={{
                flexDirection: "row",
                paddingLeft: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <FormControlLabel value={0} control={<Radio />} label="여자" />
              <FormControlLabel value={1} control={<Radio />} label="남자" />
            </RadioGroup>
          </FormControl>
          <FormControl id="mail_accept">
            <FormLabel id="demo-controlled-radio-buttons-group">
              <h4 style={{ color: "black", marginBottom: "0" }}>쪽지 수신</h4>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={mailAccept}
              onChange={handleMailAccept}
              style={{
                flexDirection: "row",
                paddingLeft: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="허용" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="비허용"
              />
            </RadioGroup>
          </FormControl>
        </section>
        <section id="btn">
          <button
            onClick={() => {
              router.push("setting/withdrawal");
            }}
          >
            회원탈퇴
          </button>
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
