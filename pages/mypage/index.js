import { useState, useEffect } from "react";
import css from "styled-jsx/css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import { fireAlert } from "../../components/common/Alert";
import axios from "axios";
import { getUserDetail } from "../../lib/apis/auth";
import * as Api from "../../lib/apis/apiClient";
import MypageNavList from "../../components/mypage/MypageNavList";

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
    width: 40vh;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
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
    border-radius: 5px;
    margin: 1rem 0rem;
    justify-content: space-between;
    min-width: 39vh;
    max-width: 18rem;
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
  .input-file-button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 10rem;
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

  const [postCnt, setPostCnt] = useState(2);
  const [commentCnt, setCommentCnt] = useState(3);
  const [likeCnt, setLikeCnt] = useState(1);
  const [count, setCount] = useState({
    noteCount: 0,
    chatCount: 0,
    alertCount: 0,
  });
  const [userData, setUserData] = useRecoilState(userState);
  const [imageSrc, setImageSrc] = useState(userData.profileImgUrl);
  const userDate = "2022.10.31";
  const userPlace = "부산해운대구";
  const userTime = "14:00";
  const userId = userData.id;

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
          `https://nanum.site/supplementary-service/api/v1/notes/${userId}/count`,
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
          `https://nanum.site/web-flux-service/api/v1/rooms/users/${userId}/count`,
          ""
        );
        if (!userCountNote) {
          throw new Error(`${getChatLists} not allowd`);
        }
        setCount((current) => {
          console.log(userCountNote);
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
  //프로필 이미지 변경하기
  const changeProfile = async (fileBob) => {
    const formData = new FormData();
    await formData.append("profileImg", fileBob);
    const request = {
      phone: userData.phone,
      nickname: userData.nickName,
      gender: userData.gender,
      isNoteReject: userData.noteReject,
      imgUrl: userData.profileImgUrl,
    };
    const uploaderString = JSON.stringify(request);
    formData.append(
      "request",
      new Blob([uploaderString], { type: "application/json" })
    );
    const res = await axios.put(
      `https://nanum.site/user-service/api/v1/users/${userData.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(res);
    if (res.status == 200) {
      fireAlert({
        icon: "success",
        title: "성공적으로 프로필이미지가 수정되었습니다.",
      });
      getUserDetail({ userId }).then((res) => {
        console.log(res);
        setUserData(res.data.result);
      });
    } else {
      fireAlert({
        icon: "error",
        title: "회원정보 수정에 실패했어요.",
      });
    }
  };
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
                  changeProfile(e.target.files[0]);
                }}
              />
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
          <MypageNavList />
          <div id="user_move"></div>
        </section>
        <section>
          <section id="user_btn">
            <div id="user_unit" onClick={() => router.push("/mail")}>
              <StyledBadge badgeContent={count.noteCount} color="error">
                <img src="/icons/mail.png" />
              </StyledBadge>
              <p>쪽지함</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/chat")}>
              <StyledBadge badgeContent={count.chatCount} color="error">
                <img src="/icons/chat.png" style={{ padding: "5px" }} />
              </StyledBadge>

              <p>채팅</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/mypage/alarm")}>
              <StyledBadge badgeContent={count.alertCount} color="error">
                <img src="/icons/alarm.png" />
              </StyledBadge>

              <p>알림</p>
            </div>
          </section>
          <section id="user_btn">
            <div id="user_unit" onClick={() => router.push("/mypage/block")}>
              <img src="/icons/user.png" />
              <p style={{ width: "10vh", textAlign: "center" }}>차단관리</p>
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
