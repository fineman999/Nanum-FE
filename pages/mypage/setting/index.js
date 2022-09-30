import css from "styled-jsx/css";
import Header from "../../../components/common/Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { useRouter } from "next/router";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Tooltip from "@mui/material/Tooltip";
import { inputAlert } from "../../../components/common/Alert";
const style = css`
  #setting {
    padding: 5rem 2rem;
  }
  #setting_title {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
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
  .active {
    cursor: pointer;
  }
`;
export default function Setting() {
  const router = useRouter();

  const [isLock, setIsLock] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

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

  //잠금 컨트롤
  const handleLock = () => {
    // inputAlert({
    //   title: "잠금 해제를 위해 비밀번호를 입력해주세요",
    // });
    setIsLock(!isLock);
  };
  //이미지 미리보기
  const encodeFileToBase64 = (fileBob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        console.log(reader.result);
        resolve();
      };
    });
  };
  return (
    <>
      <div id="setting">
        <Header title="마이페이지" type="mypage" />
        <section id="setting_header">
          <div id="setting_title">
            <h2>설정</h2>
            {isLock ? (
              <Tooltip title="잠금 해제해서 수정하기">
                <LockIcon fontSize="small" onClick={handleLock} />
              </Tooltip>
            ) : (
              <Tooltip title="변경사항 저장하기">
                <LockOpenIcon fontSize="small" onClick={handleLock} />
              </Tooltip>
            )}
          </div>
          <div id="second_header">
            <h4>계정 정보</h4>
            <h4 style={{ color: "red" }}>로그아웃</h4>
          </div>
        </section>
        <section id="setting_profile">
          <div>
            <Tooltip
              title={
                isLock
                  ? "잠금을 풀고 프로필 변경해보세요"
                  : "클릭해서 프로필 변경할 수 있어요"
              }
              placement="top"
            >
              <label htmlFor="input-file" className={isLock ? "" : "active"}>
                {imageSrc ? (
                  <img src={imageSrc} alt="preview_img" />
                ) : (
                  <img src="/images/default.png" alt="default IMG" />
                )}{" "}
              </label>
            </Tooltip>
            <input
              type="file"
              id="input-file"
              style={{ display: "none" }}
              accept="image/*"
              disabled={isLock ? true : false}
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
            />
          </div>
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
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="여자"
                disabled={isLock ? true : false}
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="남자"
                disabled={isLock ? true : false}
              />
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
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="허용"
                disabled={isLock ? true : false}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="비허용"
                disabled={isLock ? true : false}
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
