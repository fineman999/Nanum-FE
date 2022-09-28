import { useState } from "react";
import css from "styled-jsx/css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";

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
  }
  #user_profile {
    display: flex;
    align-items: center;
  }
  #user_activity {
    display: flex;
  }
  #user_header img {
    width: 10vh;
    height: 10vh;
  }
  button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 20vh;
    height: 4vh;
  }
  #user_content {
    margin-left: 1rem;
  }
  h3 {
    width: 100%;
  }
  h4 {
    width: 100%;
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
    margin: 0;
  }
  p {
    margin: 0;
  }
  #move_content {
    margin-right: 1rem;
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

  const [userName, setUserName] = useState("노숙자");
  const [postCnt, setPostCnt] = useState(2);
  const [commentCnt, setCommentCnt] = useState(3);
  const [likeCnt, setLikeCnt] = useState(1);

  const userDate = "2022.10.31";
  const userPlace = "부산해운대구";
  const userTime = "14:00";
  return (
    <>
      <Header title="마이페이지" type="my" />
      <div id="mypage">
        <section id="user_header">
          <img src="/images/default.png"></img>
          <div id="user_content">
            <div id="user_profile">
              <h3>{userName}</h3>
              <button>프로필 수정</button>
            </div>
            <div id="user_activity">
              <h4
                onClick={() => {
                  router.push("/mypage/posts");
                }}
              >
                게시글 {postCnt}
              </h4>

              <h4
                onClick={() => {
                  router.push("/mypage/comments");
                }}
              >
                댓글 {commentCnt}
              </h4>

              <h4
                onClick={() => {
                  router.push("/like");
                }}
              >
                좋아요 {likeCnt}
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
                        pathname: "/mypage/contacts",
                        query: { type: 1 },
                      },
                      `/mypage/contacts`
                    );
                  }}
                >
                  더보기
                </p>
              </div>
              <p>
                {userDate} {userPlace} {userTime}
              </p>
            </div>
            <img src="/images/house.png" />
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
                        pathname: "/mypage/contacts",
                        query: { type: 2 },
                      },
                      `/mypage/contacts`
                    )
                  }
                >
                  더보기
                </p>
              </div>

              <p>
                {userDate} {userPlace} {userTime}
              </p>
            </div>
            <img src="/images/house.png" />
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
            <div id="user_unit" onClick={() => router.push("/like")}>
              <img src="/icons/heart.png" />
              <p>좋아요</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/mypage/review")}>
              <img src="/icons/review.png" />
              <p>리뷰</p>
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
