import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import MailModal from "../../components/common/modal/mailModal";

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
    color: #acabab;
  }
  .active {
    color: black !important;
  }
  #mail_body {
    width: 100%;
    height: 100%;
  }
  #unit_mail {
    background-color: #ffff;
    display: flex;
    padding: 1rem;
    margin-bottom: 1;
    margin-bottom: 0.1rem;
    /* flex-direction: column; */
    color: #acabab;
  }
  #mail_user {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 0.5rem;
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
  #mail_text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 6rem;
  }
`;
const postMail = [
  {
    id: 1,
    name: "캉민수",
    text: "배고파",
    date: "9월20일",
    active: false,
    img: ["/images/house.png", "/images/house.png"],
  },
  {
    id: 2,
    name: "캉민수",
    text: "배고파",
    date: "9월20일",
    active: true,
    img: ["/images/house.png", "/images/house.png"],
  },
  {
    id: 3,
    name: "캉민수",
    text: "배고파",
    date: "9월20일",
    active: false,
    img: [],
  },
  {
    id: 4,
    name: "캉민수",
    text: "배고파",
    date: "9월20일",
    active: false,
    img: [],
  },
  {
    id: 5,
    name: "캉민수",
    text: "배고파",
    date: "9월20일",
    active: true,
    img: [],
  },
];
const getMail = [
  {
    id: 1,
    name: "곽찬영",
    text: " JavaScript (JS)는 가벼운, 인터프리터 혹은 just-in-time 컴파일 프로그래밍 언어로, 일급 함수를 지원합니다. 웹 페이지를 위한 스크립트 언어로 잘 알려져 있지만, Node.js, Apache CouchDB, Adobe Acrobat처럼 많은 비 브라우저 환경에서도 사용하고 있습니다. ",
    date: "9월20일",
    active: true,
    img: ["/images/house.png", "/images/house.png"],
  },
  {
    id: 2,
    name: "곽찬영",
    text: "배고파",
    date: "9월20일",
    active: true,
    img: [],
  },
  {
    id: 3,
    name: "곽찬영",
    text: "배고파",
    date: "9월20일",
    active: true,
    img: [],
  },
  {
    id: 4,
    name: "곽찬영",
    text: "배고파",
    date: "9월20일",
    active: true,
    img: [],
  },
  {
    id: 5,
    name: "곽찬영",
    text: "배고파",
    date: "9월20일",
    active: true,
    img: [],
  },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function MailList() {
  const [isType, setIsType] = useState(1);
  const [mailType, setMailType] = useState(postMail);
  const [isUpdate, setIsUpdate] = useState(false);

  const [currentMail, setCurrentMail] = useState(postMail[0]);
  //modal 관리
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div id="maillist">
        <Header title="쪽지함" type="mail" />

        <div id="mail_header">
          <div id="mail_type">
            <h2
              className={isType == 1 ? "active" : ""}
              onClick={() => {
                setIsType(1);
                setMailType(postMail);
                setIsUpdate(false);
              }}
            >
              받은 쪽지함
            </h2>
            <h2
              className={isType == 2 ? "active" : ""}
              onClick={() => {
                setIsType(2);
                setMailType(getMail);
                setIsUpdate(false);
              }}
            >
              보낸 쪽지함
            </h2>
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
          {mailType &&
            mailType.map((mail) => (
              <div
                key={mail.id}
                id="unit_mail"
                className={mail.active ? "active" : ""}
                onClick={() => {
                  handleOpen();
                  setCurrentMail(mail);
                }}
              >
                {isUpdate && (
                  <>
                    <Checkbox {...label} color="default" />
                  </>
                )}
                <div style={{ width: "100%" }}>
                  <div id="mail_user">
                    <h3>{mail.name}</h3>
                    <p>{mail.date}</p>
                  </div>
                  <div>
                    <p id="mail_text">{mail.text}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <MailModal
          open={open}
          handleClose={handleClose}
          mail={currentMail}
          isType={isType}
        />
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
