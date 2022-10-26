import { useState, useEffect } from "react";
import css from "styled-jsx/css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import SubHeader from "../../components/common/SubHeader";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import { fireAlert } from "../../components/common/Alert";
import axios from "axios";
import { getUserDetail } from "../../lib/apis/auth";
import * as Api from "../../lib/apis/apiClient";
import MypageNavList from "../../components/mypage/MypageNavList";
import Image from "next/image";
import { Link } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
const style = css`
  #user_profile {
    display: flex;
    align-items: center;
  }
  #user_header img {
    width: 10vh;
    height: 10vh;
    border-radius: 100%;
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
  /* .input-file-button {
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
  } */
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
      <SubHeader title="마이페이지" type="mypage" />
      <div id="mypage">
        <section
          id="user_header"
          style={{ display: "flex", width: "100%", marginBottom: "15px" }}
        >
          <div
            className="profile_image"
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "50px",
              marginRight: "10px",
            }}
          >
            {imageSrc ? (
              <Image src={imageSrc} alt="preview_img" layout="fill" />
            ) : (
              <Image
                src="/images/default.png"
                alt="default IMG"
                layout="fill"
              />
            )}
          </div>
          <div id="user_content" style={{ flex: 1 }}>
            <div id="user_profile">
              <h3 className="user_name" style={{ marginRight: "3px" }}>
                {userData.nickName}
              </h3>
              <label
                htmlFor="input-file"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <PhotoCameraIcon />
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
              <Link href="/mypage/posts">
                <a>게시글 {postCnt}</a>
              </Link>
              <Link href="/mypage/comments">
                <a>댓글 {commentCnt}</a>
              </Link>
              <Link href="/like">
                <a>좋아요 {likeCnt}</a>
              </Link>
            </div>
          </div>
        </section>

        <section id="user_state">
          <MypageNavList />
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
