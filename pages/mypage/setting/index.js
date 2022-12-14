import css from "styled-jsx/css";
import Header from "../../../components/common/Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Tooltip from "@mui/material/Tooltip";
import { inputAlert } from "../../../components/common/PasswordAlert";
import {
  getUserDetail,
  putPassword,
  putUserDetail,
} from "../../../lib/apis/auth";
import { useRecoilState } from "recoil";
import { authState, userState } from "../../../state/atom/authState";
import axios from "axios";
import { fireAlert } from "../../../components/common/Alert";
import { NotificationAlert } from "../../../components/common/NotificationAlert";
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
  const [userData, setUserData] = useRecoilState(userState);
  const [authData, setAuthData] = useRecoilState(authState);
  const [imageSrc, setImageSrc] = useState(userData.profileImgUrl);
  const [mailAccept, setMailAccept] = useState(userData.noteReject);
  const [sex, setSex] = useState(userData.gender);
  const [imgFile, setImgFile] = useState();
  const userId = userData.id;
  const handleMailAccept = (event) => {
    setMailAccept(event.target.value);
  };
  const handleSex = (event) => {
    setSex(event.target.value);
  };

  //?????? ?????????
  const handleLock = () => {
    if (isLock) {
      inputAlert({
        title: "?????? ????????? ?????? ??????????????? ??????????????????",
        userId: userData.id,
        setIsLock: setIsLock,
      });
    } else {
      setIsLock(true);
      updateUser();
    }
  };

  //????????????
  const logOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    setUserData();

    router.push("/");
  };

  //????????? ????????????
  const encodeFileToBase64 = (fileBob) => {
    const reader = new FileReader();
    setImgFile(fileBob);
    reader.readAsDataURL(fileBob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);

        resolve();
      };
    });
  };

  //???????????? - ??????
  const phoneFomatter = (str) => {
    const formatNum = str && str.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    return formatNum;
  };

  //date ?????? ??????
  const handleDate = (str) => {
    const date = new Date(str);
    return date.toLocaleDateString();
  };

  //???????????? ????????????
  const updateUser = async () => {
    const formData = new FormData();
    await formData.append("profileImg", imgFile);
    const request = {
      phone: userData.phone,
      nickname: userData.nickName,
      gender: sex,
      isNoteReject: mailAccept,
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
        title: "??????????????? ??????????????? ?????????????????????.",
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
      <div id="setting">
        <Header title="???????????????" type="mypage" />
        <section id="setting_header">
          <div id="setting_title">
            <h2>??????</h2>
            {isLock ? (
              <Tooltip title="?????? ???????????? ????????????">
                <LockIcon fontSize="small" onClick={handleLock} />
              </Tooltip>
            ) : (
              <Tooltip title="???????????? ????????????">
                <LockOpenIcon fontSize="small" onClick={handleLock} />
              </Tooltip>
            )}
          </div>
          <div id="second_header">
            <h4>?????? ??????</h4>
            <h4 style={{ color: "red" }} onClick={logOut}>
              ????????????
            </h4>
          </div>
        </section>
        <section id="setting_profile">
          <div>
            <Tooltip
              title={
                isLock
                  ? "????????? ?????? ????????? ??????????????????"
                  : "???????????? ????????? ????????? ??? ?????????"
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
          <h2 style={{ marginBottom: "0.5rem" }}>{userData.nickName}</h2>
          <p style={{ marginBottom: "0.5rem" }}>
            ????????? {handleDate(userData.createAt)}
          </p>
          <hr />
        </section>
        <section id="setting_body">
          <h4>?????????</h4>
          <p>{userData.email}</p>
          <h4>????????????</h4>
          <p
            style={{ color: "#415ffc", cursor: "pointer" }}
            onClick={() => {
              router.push("setting/password");
            }}
          >
            ???????????? ????????????
          </p>
          <h4>????????????</h4>
          <p>{phoneFomatter(userData.phone)}</p>
          <FormControl id="sex">
            <FormLabel id="demo-controlled-radio-buttons-group">
              <h4 style={{ color: "black", marginBottom: "0" }}>??????</h4>
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
                value="F"
                control={<Radio />}
                label="??????"
                disabled={isLock ? true : false}
              />
              <FormControlLabel
                value="M"
                control={<Radio />}
                label="??????"
                disabled={isLock ? true : false}
              />
            </RadioGroup>
          </FormControl>
          {/* <FormControl id="mail_accept">
            <FormLabel id="demo-controlled-radio-buttons-group">
              <h4 style={{ color: "black", marginBottom: "0" }}>?????? ??????</h4>
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
                label="??????"
                disabled={isLock ? true : false}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="?????????"
                disabled={isLock ? true : false}
              />
            </RadioGroup>
          </FormControl> */}
        </section>
        <section id="btn">
          <button
            onClick={() => {
              router.push("setting/withdrawal");
            }}
          >
            ????????????
          </button>
        </section>
      </div>
      <NotificationAlert/>
      <style jsx>{style}</style>
    </>
  );
}
