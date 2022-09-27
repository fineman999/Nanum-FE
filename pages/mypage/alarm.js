import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const style = css`
  #mail_header {
    margin: 5rem 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #mail_type {
    display: flex;
  }
  #mail_header h2 {
    margin-right: 1rem;
    color: black;
  }
  #mail_body {
    width: 100%;
    height: 100%;
  }
  #unit_mail {
    background-color: #ffff;
    display: flex;
    padding: 2rem 1rem;
    margin-bottom: 1;
    margin-bottom: 0.1rem;
    align-items: center;
    height: 10vh;
    box-sizing: border-box;
  }
  #mail_user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #mail_user p {
    color: #acabab;
  }
  #delete {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  #delete_btn {
    padding: 1rem 0rem;
    width: 50%;
    background-color: #777;
    color: white;
    font-size: 24px;
    text-align: center;
  }

  h3 {
    font-weight: normal;
  }
`;
const myPosts = [
  { id: 1, text: "What was name of that song?", date: "9월20일" },
  { id: 2, text: "What was name of that song?", date: "9월20일" },
  { id: 3, text: "What was name of that song?", date: "9월20일" },
  { id: 4, text: "What was name of that song?", date: "9월20일" },
  { id: 5, text: "What was name of that song?", date: "9월20일" },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function AlarmList() {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <>
      <div id="maillist">
        <Header title="알림" type="mail" />

        <div id="mail_header">
          <div id="mail_type">
            <h2>알림 HISTORY</h2>
          </div>
          <p
            onClick={() => {
              setIsUpdate(!isUpdate);
            }}
          >
            편집
          </p>
        </div>
        <div id="mail_body">
          {myPosts &&
            myPosts.map((mail) => (
              <div key={mail.id} id="unit_mail">
                {isUpdate && (
                  <>
                    <Checkbox {...label} color="default" />
                  </>
                )}
                <div style={{ width: "100%" }}>
                  <div id="mail_user">
                    <h3>{mail.text}</h3>
                    <p>{mail.date}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {isUpdate && (
          <div id="delete">
            <div id="delete_btn" style={{ marginRight: "0.1rem" }}>
              선택 삭제
            </div>
            <div id="delete_btn">전체 삭제</div>
          </div>
        )}
      </div>

      <style jsx>{style}</style>
    </>
  );
}
