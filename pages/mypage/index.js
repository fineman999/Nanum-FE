import { useState, useEffect } from "react";
import css from "styled-jsx/css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../state/atom/authState";
import { fireAlert } from "../../components/common/Alert";
import axios from "axios";
import { getUserDetail } from "../../lib/apis/auth";
import * as Api from "../../lib/apis/apiClient";
import NoteAltIcon from "@mui/icons-material/NoteAltOutlined";
import styles from "../../styles/MyPage.module.css";
import { Divider } from "@mui/material";
import BottomMenu from "../../components/common/BottomMenu";
import { NotificationAlert } from "../../components/common/NotificationAlert";
import likeCountState from "../../state/atom/likeCountState";

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

const BASE_URL = `${process.env.NANUM_ENROLL_SERVICE_BASE_URL}`;
const BOARD_SERVICE_BASE_URL = `${process.env.NANUM_BOARD_SERVICE_BASE_URL}`;

export default function MyPage() {
  const router = useRouter();

  const [postCnt, setPostCnt] = useState(0);
  const [commentCnt, setCommentCnt] = useState(0);
  const likeCnt = useRecoilValue(likeCountState);
  const [count, setCount] = useState({
    noteCount: 0,
    chatCount: 0,
    alertCount: 0,
  });

  const [userData, setUserData] = useRecoilState(userState);
  const [imageSrc, setImageSrc] = useState("");
  // const userDate = "2022.10.31";
  // const userPlace = "??????????????????";
  // const userTime = "14:00";
  const userId = userData.id;

  // ?????????, ??????, ?????? ?????? ??????
  const [houseStatus, setHouseStatus] = useState({
    myHouseId: "",
    myHouseImg: "",
    myHouseName: "",
    myRoomName: "",
    tourHouseId: "",
    tourDate: "",
    tourHouseImg: "",
    tourHouseName: "",
    tourRoomName: "",
    moveInHouseId: "",
    moveInDate: "",
    moveInHouseImg: "",
    moveInHouseName: "",
    moveInRoomName: "",
  });

  //????????? ????????????
  const encodeFileToBase64 = (fileBob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // ?????? ????????????
  useEffect(() => {
    setImageSrc(userData.profileImgUrl);
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
          let newCondition = { ...current };
          newCondition["chatCount"] = userCountNote.data.count;
          return newCondition;
        });
      } catch (e) {
        console.log("Error" + e);
      }
      const API_URI = `/tours/moveIn/users/${userData.id}`;
      Api.get(BASE_URL, API_URI)
        .then((res) => {
          const { status } = res;
          const { isSuccess, message, result } = res.data;

          if (status === 200 && isSuccess) {
            setHouseStatus({ ...result });
          }
        })
        .catch((err) => console.log(err));
    }
    reactive();

    // ?????????/?????? ?????? ????????????
    axios
      .get(BOARD_SERVICE_BASE_URL + "/posts/total", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        const { status } = res;
        const { isSuccess, message, result } = res.data;
        if (status === 200 && isSuccess) {
          setPostCnt(result.postCount);
          setCommentCnt(result.replyCount);
        }
      });
  }, []);

  //????????? ????????? ????????????
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
    if (res.status == 200) {
      fireAlert({
        icon: "success",
        title: "??????????????? ????????????????????? ?????????????????????.",
      });
      getUserDetail({ userId }).then((res) => {
        setUserData(res.data.result);
      });
    } else {
      fireAlert({
        icon: "error",
        title: "???????????? ????????? ???????????????.",
      });
    }
  };
  return (
    <>
      <Header title="???????????????" type="my" />
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
                ????????? ??????
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
              <h4>????????? {postCnt}</h4>

              <h4>?????? {commentCnt}</h4>

              <h4>????????? {likeCnt}</h4>
            </div>
          </div>
        </section>
        <hr />
        <section id="user_state">
          <div id="user_move" className={styles.user_move}>
            <div id="move_content" className={styles.move_content}>
              <div id="move_title" className={styles.move_title}>
                <p>????????? </p>
                <p
                  style={{
                    marginLeft: "0.5rem",
                    color: "red",
                    fontWeight: "normal",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const API_URI = `/move-in/users/in/${userData.id}`;

                    Api.get(BASE_URL, API_URI)
                      .then((res) => {
                        const { status, data } = res;
                        if (status === 204) {
                          fireAlert({
                            icon: "warning",
                            title: "?????? ???????????? ???????????????!",
                          });
                          return;
                        } else {
                          router.push(
                            {
                              pathname: "/mypage/myroom",
                              query: { type: 1 },
                            },
                            `/mypage/myroom`
                          );
                        }
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  ?????????
                </p>
              </div>
              <Divider />
              <div className={styles.my_room_status}>
                <div className={styles.my_house_name}>
                  <strong>?????????</strong> <br />
                  {houseStatus.myHouseName}
                </div>
                <div className={styles.my_room_name}>
                  <strong>???</strong> <br />
                  {houseStatus.myRoomName}
                </div>
              </div>
            </div>
            <img src={houseStatus.myHouseImg || "/icons/myHome.png"} />
          </div>
          <div id="user_move" className={styles.user_move}>
            <div id="move_content" className={styles.move_content}>
              <div id="move_title" className={styles.move_title}>
                <p>?????? ?????? ?????? </p>
                <p
                  style={{
                    marginLeft: "0.5rem",
                    color: "red",
                    fontWeight: "normal",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    router.push(
                      {
                        pathname: "/mypage/moves",
                        query: { type: 1 },
                      },
                      `/mypage/moves`
                    );
                  }}
                >
                  ?????????
                </p>
              </div>
              <Divider />
              <div className={styles.my_move_status}>
                <div className={styles.my_house_name}>
                  <strong>?????????</strong>
                  <br />
                  {houseStatus.moveInHouseName}
                </div>
                <div className={styles.my_room_name}>
                  <strong>???</strong>
                  <br />
                  {houseStatus.moveInRoomName}
                </div>
              </div>
              <div className={styles.my_room_date}>
                <strong>?????? ??????: </strong>
                {houseStatus.moveInDate}
              </div>
            </div>
            <img
              src={houseStatus.moveInHouseImg || "/icons/myStateHouse.png"}
            />
          </div>
          <div id="user_move" className={styles.user_move}>
            <div id="move_content" className={styles.move_content}>
              <div id="move_title" className={styles.move_title}>
                <p>?????? ?????? ??????</p>
                <p
                  style={{
                    marginLeft: "0.5rem",
                    color: "red",
                    fontWeight: "normal",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/mypage/tours",
                        query: { type: 2 },
                      },
                      `/mypage/tours`
                    )
                  }
                >
                  ?????????
                </p>
              </div>
              <Divider />
              <div className={styles.my_tour_status}>
                <div className={styles.my_house_name}>
                  <strong>?????????</strong>
                  <br />
                  {houseStatus.tourHouseName}
                </div>
                <div className={styles.my_room_name}>
                  <strong>???</strong>
                  <br />
                  {houseStatus.tourRoomName}
                </div>
              </div>
              <div className={styles.my_room_date}>
                <strong>?????? ??????: </strong>
                {houseStatus.tourDate}
              </div>
            </div>
            <img src={houseStatus.tourHouseImg || "/icons/mytour.png"} />
          </div>
        </section>
        <section>
          <section id="user_btn">
            <div id="user_unit" onClick={() => router.push("/mail")}>
              <StyledBadge badgeContent={count.noteCount} color="error">
                <img src="/icons/mail.png" />
              </StyledBadge>
              <p>?????????</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/chat")}>
              <StyledBadge badgeContent={count.chatCount} color="error">
                <img src="/icons/chat.png" style={{ padding: "5px" }} />
              </StyledBadge>

              <p>??????</p>
            </div>
            <div id="user_unit" onClick={() => router.push("/mypage/mynote")}>
              <StyledBadge badgeContent={count.alertCount} color="error">
                {/* <img src="/icons/alarm.png" /> */}
                <NoteAltIcon sx={{ fontSize: "3rem" }} />
              </StyledBadge>

              <p>?????? ???</p>
            </div>
          </section>
          <section id="user_btn">
            <div id="user_unit" onClick={() => router.push("/mypage/block")}>
              <img src="/icons/user.png" />
              <p style={{ width: "10vh", textAlign: "center" }}>????????????</p>
            </div>
            {/* <div id="user_unit" onClick={() => router.push("/mypage/review")}>
              <img src="/icons/review.png" />
              <p>??????</p>
            </div> */}
            <div id="user_unit" onClick={() => router.push("/mypage/setting")}>
              <img src="/icons/setting.png" />
              <p>??????</p>
            </div>
          </section>
        </section>
      </div>
      <BottomMenu />

      <style jsx>{style}</style>
    </>
  );
}
