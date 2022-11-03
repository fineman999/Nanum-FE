import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import MailModal from "../../components/common/modal/MailModal";
import {
  deleteMail,
  getMailDetail,
  getReceivedMail,
  getSentMail,
} from "../../lib/apis/mail";
import { fireAlert } from "../../components/common/Alert";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atom/authState";
import { NoData } from "../../components/common/NoData";
import BottomMenu from "../../components/common/BottomMenu";

// 메일 데이터
const mailData = {
  note: {
    id: 8,
    title: "title",
    content: "Hello, world",
    senderId: 1,
    receiverId: 3,
    receiver: {
      email: "saros@gmail.com",
      nickName: "아거나 적줘여",
      phone: "0102365255",
      createAt: "2022-10-07T04:56:19",
      noteReject: true,
    },
    sender: {
      email: "spharos@gmail.com",
      nickName: "아거나 적어줘여",
      phone: "0109665255",
      createAt: "2022-10-07T02:26:57",
      noteReject: true,
    },
    createAt: "2022-10-11T05:31:23",
  },
  noteImgList: [
    {
      originName: "test.PNG",
      savedName: "599c48eb-442a-49cb-96f2-6aaccad82434-test.PNG",
      imgPath:
        "https://nanum.s3.ap-northeast-2.amazonaws.com/599c48eb-442a-49cb-96f2-6aaccad82434-test.PNG",
    },
    {
      originName: "네이버 로그인.PNG",
      savedName: "3ab31f11-c605-4f68-a7ad-cee72ef129d0-네이버 로그인.PNG",
      imgPath:
        "https://nanum.s3.ap-northeast-2.amazonaws.com/3ab31f11-c605-4f68-a7ad-cee72ef129d0-%EB%84%A4%EC%9D%B4%EB%B2%84%20%EB%A1%9C%EA%B7%B8%EC%9D%B8.PNG",
    },
  ],
};

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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function MailList() {
  const [sentMail, setSenttMail] = useState([]);
  const [receivedMail, setReceivedMail] = useState([]);
  //1: 받은 메일함 , 2: 보낸 메일함
  const [isType, setIsType] = useState(1);

  const [mailType, setMailType] = useState(receivedMail);
  const [isUpdate, setIsUpdate] = useState(false);
  const userData = useRecoilValue(userState);
  const userId = userData.id;

  const [currentMail, setCurrentMail] = useState(mailData);

  //삭제 쪽지 리스트
  const [noteList, setNoteList] = useState([]);
  //modal 관리
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  //date 형식 변환
  const handleDate = (str) => {
    const date = new Date(str);
    return date.toLocaleDateString();
  };

  //현재 쪽지
  const handleCurrentMail = (noteId) => {
    getMailDetail({ noteId, userId })
      .then((res) => {
        console.log(res.data, "ss");
        setCurrentMail(res.data);
        getItemList();
        handleOpen();
      })
      .catch((err) => console.log(err));
  };

  //쪽지 리스트 추가하기
  const addList = (id, e) => {
    e.stopPropagation();
    if (noteList.includes(id)) {
      const tmp = noteList.filter(function (value, index, arr) {
        return value != id;
      });
      setNoteList(tmp);
    } else {
      setNoteList([...noteList, id]);
    }
    console.log(noteList);
  };

  //쪽지 삭제하기
  const delMail = (e) => {
    e.preventDefault();
    noteList.map((noteId) => {
      deleteMail({ noteId, userId })
        .then((res) => {
          console.log(res);
          fireAlert({ icon: "success", title: "삭제되었습니다." });
          getItemList();
          setNoteList([]);
        })
        .catch((err) => console.log(err));
    });
  };
  //쪽지 전체 삭제하기
  const delAll = () => {
    mailType.map((mail) => {
      let noteId = mail.id;
      console.log(isType);
      deleteMail({ noteId, userId })
        .then((res) => {
          fireAlert({ icon: "success", title: "삭제되었습니다." });
          getItemList();
        })
        .catch((err) => console.log(err));
    });
  };

  const getItemList = () => {
    if (isType == 1) {
      getReceivedMail(userId)
        .then((res) => {
          console.log(res);
          setReceivedMail(res.data.result.content);
          setMailType(res.data.result.content);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getSentMail(userId)
        .then((res) => {
          setSenttMail(res.data.result.content);
          setMailType(res.data.result.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //쪽지목록 가져오기
  useEffect(() => {
    getReceivedMail(userId)
      .then((res) => {
        console.log(res);
        setReceivedMail(res.data.result.content);
        setMailType(res.data.result.content);
      })
      .catch((err) => {
        console.log(err);
      });
    getSentMail(userId)
      .then((res) => {
        setSenttMail(res.data.result.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                setMailType(receivedMail);
                setIsUpdate(false);
              }}
            >
              받은 쪽지함
            </h2>
            <h2
              className={isType == 2 ? "active" : ""}
              onClick={() => {
                setIsType(2);
                setMailType(sentMail);
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
                className={!mail.readMark || isType == 2 ? "active" : ""}
                onClick={() => {
                  handleCurrentMail(mail.id);
                }}
              >
                {isUpdate && (
                  <>
                    <Checkbox
                      {...label}
                      color="default"
                      onClick={(e) => addList(mail.id, e)}
                    />
                  </>
                )}
                <div style={{ width: "100%" }}>
                  <div id="mail_user">
                    {isType == 2 ? (
                      <h3>{mail.receiver.nickName}</h3>
                    ) : (
                      <h3>{mail.sender.nickName}</h3>
                    )}

                    <p>{handleDate(mail.createAt)}</p>
                  </div>
                  <div>
                    <p id="mail_text">{mail.content}</p>
                  </div>
                </div>
              </div>
            ))}
          <NoData data={mailType} />
        </div>

        <MailModal
          open={open}
          handleClose={handleClose}
          isType={isType}
          mail={currentMail}
        />
        {isUpdate && (
          <div id="delete">
            <div
              id="delete_btn"
              style={{ marginRight: "0.1rem" }}
              onClick={delMail}
            >
              선택 삭제
            </div>
            <div id="delete_btn" onClick={delAll}>
              전체 삭제
            </div>
          </div>
        )}
      </div>
      <BottomMenu />
      <style jsx>{style}</style>
    </>
  );
}
