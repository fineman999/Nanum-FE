import { useRouter } from "next/router";
import { useRef, useState } from "react";
import css from "styled-jsx/css";
import { fireAlert } from "../../components/common/Alert";

import * as Api from "../../lib/apis/apiClient";
import axios from "axios";
import SubHeader from "../../components/common/SubHeader";
import { postFindEmail, postPhone } from "../../lib/apis/auth";
import Slide from "@mui/material/Slide";
const style = css`
  #signup {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 92.5vh;
    padding: 2rem 0rem;
  }
  #signup_innercontainer {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-top: 10rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

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
  .selectBox {
    position: relative;
    width: 20vh;
    height: 4vh;
    border-radius: 30px;
    border: 2px solid #76c1b2;
    margin-bottom: 1rem;
  }
  .selectBox .select {
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0 1rem;
    position: relative;
    z-index: 3;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  .selectBox .select option {
    background: #76c1b2;
    color: #fff;
    padding: 3px 0;
    font-size: 16px;
  }
  .selectBox .icoArrow {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 35px;
    height: inherit;
    border-left: 2px solid #76c1b2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selectBox .icoArrow img {
    width: 50%;
    transition: 0.3s; // ???????????? ??????
  }

  .selectBox .select:focus + .icoArrow img {
    transform: rotate(180deg);
  }
  article span {
    padding: 2px 0.5rem;
  }
  .warn {
    color: rgb(240, 90, 90);
  }
  .collect {
    color: green;
  }
  .input-file-button {
    padding: 0.4rem 1rem;
    width: 60%;
    text-align: center;
    background-color: #76c1b2;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    margin: 0;
    font-size: 1rem;
  }
  #preview_profile img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
`;

export default function Account() {
  const router = useRouter();
  const [emailValid, setEmailValid] = useState(
    "????????? ????????? ????????? ????????? ??????????????? ???????????? ????????? ????????? ????????? ??????????????????."
  );
  const [validCheck, setValidCheck] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [numValid, setNumValid] = useState(0);
  const [phoneExist, setPhoneExist] = useState(true);
  const phoneRef = useRef();
  const [phone, setPhone] = useState("");
  const [emailSuccessValid, setEmailSuccessValid] = useState(false);
  const [email, setEmail] = useState("");
  const handlePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }
      result += value[i];
    }
    phoneRef.current.value = result;
    setPhone(e.target.value);
  };
  //???????????? ??????
  const postPhoneCheck = () => {
    let phoneValue = phone.split("-");
    if (phoneValue.length !== 3) {
      fireAlert({
        icon: "error",
        title: "??????????????? ?????? ??????????????????. ?????? ??????????????????.",
      });
      return;
    }
    phoneValue = phoneValue[0] + phoneValue[1] + phoneValue[2];
    postPhone(phoneValue)
      .then((res) => {
        setEmailValid("??????????????? ??????????????????.");
        setValidCheck(true);
      })
      .catch((err) => {
        fireAlert({
          icon: "error",
          title: "???????????? ??????.",
        });
      });
  };

  //?????? ?????? ?????? ??????
  const checkNum = () => {
    let phoneValue = phone.split("-");
    if (phoneValue.length !== 3) {
      fireAlert({
        icon: "error",
        title: "??????????????? ?????? ??????????????????. ?????? ??????????????????.",
      });
      return;
    }

    phoneValue = phoneValue[0] + phoneValue[1] + phoneValue[2];
    const number = numValid;
    postFindEmail({ phoneValue, number })
      .then((res) => {
        if (res.status === 200) {
          setPhoneValid(true);
          setPhoneExist(true);
          setEmail(res.data);

          setEmailSuccessValid(true);
          setEmailValid("????????? ????????? ????????? ????????? ???????????????.");
        } else if (res.status === 208) {
          setPhoneExist(false);
          fireAlert({
            icon: "error",
            title: "?????? ????????? ????????????. ?????? ??? ??????????????????.",
          });
        } else {
          setPhoneValid(false);
          fireAlert({
            icon: "error",
            title: "?????? ????????? ????????????. ?????? ??? ??????????????????.",
          });
        }
      })
      .catch((err) => {
        setPhoneValid(false);
        fireAlert({
          icon: "error",
          title: "?????? ????????? ????????????. ?????? ??? ??????????????????.",
        });
      });
  };
  return (
    <>
      <SubHeader title="????????? ??????" type="find-account" />
      <div id="signup">
        <div id="signup_innercontainer">
          <section id="signup_header">
            <h1 style={{ marginBottom: "2rem" }}>NANUM</h1>
          </section>
          <section id="signup_header2" style={{ textAlign: "center" }}>
            <h2>{emailValid}</h2>
          </section>
          <section id="signup_htmlForm">
            <article id="tel">
              <label htmlFor="tel" style={{ marginBottom: "1rem" }}>
                ????????????
              </label>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <input
                  type="tel"
                  id="tel"
                  placeholder="???????????? ???????????????."
                  ref={phoneRef}
                  style={{ marginRight: "5px", width: "60%" }}
                  onChange={handlePhone}
                  value={phone}
                  disabled={emailSuccessValid}
                />
                <button
                  style={{ width: "40%" }}
                  onClick={postPhoneCheck}
                  disabled={emailSuccessValid}
                >
                  ???????????? ??????
                </button>
              </div>
              <Slide
                direction="left"
                in={validCheck}
                mountOnEnter
                unmountOnExit
              >
                <div style={{ display: "flex", width: "100%" }}>
                  <input
                    type="text"
                    id="telCheck"
                    placeholder="??????????????? ???????????????."
                    onChange={(e) => setNumValid(e.target.value)}
                    disabled={emailSuccessValid}
                  />
                  <button
                    style={{ width: "40%", marginLeft: "0.5rem" }}
                    onClick={checkNum}
                    disabled={emailSuccessValid}
                  >
                    ??????
                  </button>
                </div>
              </Slide>

              {numValid ? (
                <>
                  {phoneValid ? (
                    <span className="collect">?????????????????????.</span>
                  ) : (
                    <span className="warn">
                      {phoneExist
                        ? "??????????????? ?????? ?????????."
                        : "?????? ???????????? ?????????????????????."}
                    </span>
                  )}
                </>
              ) : (
                <></>
              )}
            </article>
          </section>
          <Slide
            direction="left"
            in={emailSuccessValid}
            mountOnEnter
            unmountOnExit
          >
            <article id="btn_container">
              <h1 style={{ marginBottom: "2rem" }}>{email}</h1>
              <button id="signup_btn" onClick={() => router.push("/login")}>
                ?????????
              </button>
            </article>
          </Slide>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
