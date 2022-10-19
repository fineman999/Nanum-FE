import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import { useState } from "react";
import { useRouter } from "next/router";
import TourContractList from "../../components/TourContractList";

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
  #contract_body {
    width: 100%;
    height: 100%;
  }
  #unit_contract {
    background-color: #ffff;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 10px;
    height: 12vh;
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
  #contract_header {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0;
  }
  #contract_data {
    display: flex;
    color: #acabab;
  }
  img {
    width: 12vh;
    height: 100%;
    border-radius: 10px;
  }

  button {
    background-color: #76c1b2;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    position: absolute;
    right: 10px;
    bottom: 0;
  }
  #contract_data {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  #contract_text {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;
const moveState = [
  {
    id: 1,
    state: 1,
    date: "2022.10.31",
    place: "부산 해운대구 스파 101호",
    time: "14:00",
    imgURL: "/images/house.png",
  },
  {
    id: 2,
    state: 0,
    date: "",
    place: "부산 해운대구 스파 101호",
    time: "",
    imgURL: "/images/house.png",
  },
];
const tourState = [
  {
    id: 1,
    state: 1,
    date: "2022.10.31",
    place: "부산 해운대구 스파 101호",
    time: "14:00",
    imgURL: "/images/house.png",
  },
  {
    id: 2,
    state: 0,
    date: "",
    place: "부산 해운대구 스파 101호",
    time: "",
    imgURL: "/images/house.png",
  },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function MailList() {
  const router = useRouter();
  const [isType, setIsType] = useState(router.query.type);
  const [contractType, setContractType] = useState(moveState);

  return (
    <>
      <div id="maillist">
        <Header title="계약" type="contracts" />

        <div id="mail_header">
          <div id="mail_type">
            <h2
              className={isType == 1 ? "active" : ""}
              onClick={() => {
                setIsType(1);
                setContractType(moveState);
              }}
            >
              입주 신청
            </h2>
            <h2
              className={isType == 2 ? "active" : ""}
              onClick={() => {
                setIsType(2);
                setContractType(tourState);
              }}
            >
              투어 신청
            </h2>
          </div>
        </div>
        <div id="contract_body">
          {contractType &&
            contractType.map((contract) => (
              <div key={contract.id} id="unit_contract">
                <div id="contract_text">
                  <p id="contract_header">
                    {isType == 1 ? "입주 신청 " : "투어 신청 "}
                    {contract.state == 0 ? "대기" : "완료"}
                  </p>
                  <div id="contract_data">
                    {contract.date === "" ? (
                      ""
                    ) : (
                      <p>
                        {contract.date} {contract.time}
                      </p>
                    )}

                    <p>{contract.place}</p>
                  </div>
                  <div>
                    {contract.state === 0 ? (
                      <button>
                        {isType === 1 ? "입주 취소" : "투어 취소"}
                      </button>
                    ) : (
                      <></>
                    )}
                    {isType === 2 && contract.state === 1 ? (
                      <button>입주 신청</button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <img src={contract.imgURL} />
              </div>
            ))}
        </div>
      </div>
      <TourContractList />
      <style jsx>{style}</style>
    </>
  );
}
