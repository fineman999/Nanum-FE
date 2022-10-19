import { useEffect, useState } from "react";
import css from "styled-jsx/css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";

const style = css`
  #mypage {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 92.5vh;
    padding: 5rem 0rem;
    box-sizing: border-box;
  }
  #user_header {
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: center;
  }
  #user_profile {
    display: flex;
    align-items: center;
  }
  #user_activity {
    display: flex;
    justify-content: space-between;
  }
  #user_header img {
    width: 10vh;
    height: 10vh;
    border-radius: 100%;
  }
  #user_content {
    margin-left: 1rem;
  }
  h3 {
    width: 100%;
  }
  h4 {
    margin: 1rem 0 0 0;
  }
  #user_profile {
    height: 4vh;
  }
  #user_btn {
    display: flex;
    width: 100%;
  }
  #user_move {
    display: flex;
    padding: 1rem;
    background-color: #ffff;
    border-radius: 10px;
    margin: 1rem 0rem;
    justify-content: space-between;
    width: 39vh;
  }
  #user_move img {
    width: 10vh;
    height: 10vh;
    border-radius: 10px;
  }
  #move_title {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0 0 0.5rem;
  }
  p {
    margin: 0;
  }
  #move_content {
    width: 100%;
  }
  #user_unit {
    background-color: #ffff;
    padding: 1rem;
    width: 8vh;
    height: 8vh;
    border-radius: 10px;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #user_unit img {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
  }
  #progress img {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
  }
  #progress {
    display: flex;
    justify-content: space-between;
  }
  #progress div {
    display: flex;
    align-items: center;
  }
  #progress span {
    text-align: center;
  }
  .input-file-button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 20vh;
    padding: 0.4rem 0.4rem;
  }
`;
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function MyPage() {
  const router = useRouter();

  const [houseCnt, setHouseCnt] = useState(2);
  const [reviewCnt, setReviewCnt] = useState(3);
  const [contractCnt, setLikeCnt] = useState(1);
  const [userData, setUserData] = useRecoilState(userState);
  const [imageSrc, setImageSrc] = useState(userData.profileImgUrl);
  const [count, setCount] = useState({
    noteCount: 0,
    chatCount: 0,
    alertCount: 0,
  });
  const [moveState, setMovieState] = useState({
    wait: 0,
    go: 0,
    done: 0,
  });
  const [tourState, setTourState] = useState({
    wait: 0,
    go: 0,
    done: 0,
  });
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
  // 개수 가져오기
  useEffect(() => {
    async function reactive() {
      try {
        const userCountNote = await Api.get(
          `http://20.214.170.222:8000/supplementary-service/api/v1/notes/${userId}/count`,
          ""
        );
        if (!userCountNote) {
          throw new Error(`${getChatLists} not allowd`);
        }
        setCount((current) => {
          let newCondition = { ...current };
          newCondition["noteCount"] = userCountNote.data.result.count;
          return newCondition;
        });
        console.log(userCountNote);
      } catch (e) {
        console.log("Error" + e);
      }
      try {
        const userCountNote = await Api.get(
          `http://20.214.170.222:8000/web-flux-service/api/v1/rooms/users/${userId}/count`,
          ""
        );
        if (!userCountNote) {
          throw new Error(`${getChatLists} not allowd`);
        }
        setCount((current) => {
          let newCondition = { ...current };
          newCondition["chatCount"] = userCountNote.data.count;
          return newCondition;
        });
        console.log(userCountNote);
      } catch (e) {
        console.log("Error" + e);
      }
    }
    reactive();
  }, []);
  return (
    <>
      <Header title="마이페이지" type="my" />
      <div id="mypage">
        <section id="user_header">
          {imageSrc ? (
            <img src={imageSrc} alt="preview_img" />
          ) : (
            <img src="/images/default.png" alt="default IMG" />
          )}
          <div id="user_content">
            <div id="user_profile">
              <h3>{userData.nickName}</h3>
              <label className="input-file-button" htmlFor="input-file">
                프로필 수정
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
            </div>
            <div id="user_activity">
              <h4
                onClick={() => {
                  router.push("");
                }}
              >
                하우스 {houseCnt}
              </h4>

              <h4
                onClick={() => {
                  router.push("");
                }}
              >
                리뷰 {reviewCnt}
              </h4>

              <h4
                onClick={() => {
                  router.push("");
                }}
              >
                계약완료 {contractCnt}
              </h4>
            </div>
          </div>
        </section>
        <hr />
        <section id="user_state">
          <div id="user_move">
            <div id="move_content">
              <div id="move_title">
                <p>입주 신청 현황 </p>
                <p
                  style={{
                    marginLeft: "0.5rem",
                    color: "red",
                    fontWeight: "normal",
                    fontSize: "12px",
                  }}
                  onClick={() => {
                    router.push(
                      {
                        pathname: "/host/movestate",
                        query: { type: 0 },
                      },
                      `/host/movestate`
                    );
                  }}
                >
                  더보기
                </p>
              </div>
              <section id="progress">
                <div
                  id="wait"
                  onClick={() => {
                    router.push(
                      {
                        pathname: "/host/movestate",
                        query: { type: 0 },
                      },
                      `/host/movestate`
                    );
                  }}
                >
                  <img src="/icons/wait.png" />
                  <span>
                    <p>대기</p>
                    {moveState.wait}
                  </span>
                </div>
                <div
                  id="go"
                  onClick={() => {
                    router.push(
                      {
                        pathname: "/host/movestate",
                        query: { type: 1 },
                      },
                      `/host/movestate`
                    );
                  }}
                >
                  <img src="/icons/going.png" />
                  <span>
                    <p>진행</p>
                    {moveState.go}
                  </span>
                </div>
                <div
                  id="done"
                  onClick={() => {
                    router.push(
                      {
                        pathname: "/host/movestate",
                        query: { type: 2 },
                      },
                      `/host/movestate`
                    );
                  }}
                >
                  <img src="/icons/done.png" />
                  <span>
                    <p>완료</p>
                    {moveState.done}
                  </span>
                </div>
              </section>
            </div>
          </div>
          <div id="user_move">
            <div id="move_content">
              <div id="move_title">
                <p>투어 신청 현황</p>
                <p
                  style={{
                    marginLeft: "0.5rem",
                    color: "red",
                    fontWeight: "normal",
                    fontSize: "12px",
                  }}
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/host/tourstate",
                        query: { type: 0 },
                      },
                      `/host/tourstate`
                    )
                  }
                >
                  더보기
                </p>
              </div>
              <section id="progress">
                <div
                  id="wait"
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/host/tourstate",
                        query: { type: 0 },
                      },
                      `/host/tourstate`
                    )
                  }
                >
                  <img src="/icons/wait.png" />
                  <span>
                    <p>대기</p>
                    {tourState.wait}
                  </span>
                </div>
                <div
                  id="go"
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/host/tourstate",
                        query: { type: 1 },
                      },
                      `/host/tourstate`
                    )
                  }
                >
                  <img src="/icons/going.png" />
                  <span>
                    <p>진행</p>
                    {tourState.go}
                  </span>
                </div>
                <div
                  id="done"
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/host/tourstate",
                        query: { type: 2 },
                      },
                      `/host/tourstate`
                    )
                  }
                >
                  <img src="/icons/done.png" />
                  <span>
                    <p>완료</p>
                    {tourState.done}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </section>
        <section>
          <section id="user_btn">
            <div id="user_unit" onClick={() => router.push("/mail")}>
              <StyledBadge badgeContent={2} color="error">
                <img src="/icons/mail.png" />
              </StyledBadge>
              <p>쪽지함</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/chat")}>
              <StyledBadge badgeContent={100} color="error">
                <img src="/icons/chat.png" style={{ padding: "5px" }} />
              </StyledBadge>

              <p>채팅</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/mypage/alarm")}>
              <StyledBadge badgeContent={4} color="error">
                <img src="/icons/alarm.png" />
              </StyledBadge>

              <p>알림</p>
            </div>
          </section>
          <section id="user_btn">
            <div id="user_unit" onClick={() => router.push("/host/house")}>
              <img src="/icons/home.png" />
              <p>내하우스</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/host/tenant")}>
              <img src="/icons/user.png" />
              <p>세입자</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/mypage/setting")}>
              <img src="/icons/setting.png" />
              <p>설정</p>
            </div>
          </section>
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
