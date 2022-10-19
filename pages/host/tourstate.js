import { Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import css from "styled-jsx/css";
import Header from "../../components/common/Header";
import HostTourContractList from "../../components/HostTourContractList";
const style = css`
  #process_header {
    display: flex;
    align-items: flex-end;
  }
  #process_header h3 {
    color: #acabab;
    margin: 0rem 0.2rem;
  }
  .active {
    color: black !important;
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
    margin-right: 1rem;
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
    margin: 1rem 0rem;
    border-radius: 10px;
    height: 12vh;
  }
  img {
    width: 12vh;
    height: 100%;
    border-radius: 10px;
  }
  #contract_header {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0;
  }
  #contract_footer {
    display: flex;
    align-items: flex-end;
    width: 100%;
    position: absolute;
    justify-content: space-between;
  }
  #contract_footer img {
    width: 5vh;
    height: 5vh;
    border-radius: 100%;
    margin-top: 1rem;
  }
  #contract_text {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

const waitState = [
  {
    id: 1,
    state: 0,
    date: "",
    place: "부산 해운대구 스파 101호",
    time: "",
    imgURL: "/images/house.png",
    userProfile: "/images/default.png",
    username: "노숙자",
  },
  {
    id: 2,
    state: 0,
    date: "",
    place: "부산 해운대구 스파 101호",
    time: "",
    imgURL: "/images/house.png",
    userProfile: "/images/default.png",
    username: "노숙자",
  },
];
const goState = [
  {
    id: 1,
    state: 1,
    date: "2022.10.31",
    place: "부산 해운대구 스파 101호",
    time: "14:00",
    imgURL: "/images/house.png",
    userProfile: "/images/default.png",
    username: "노숙자",
  },
  {
    id: 2,
    state: 1,
    date: "",
    place: "부산 해운대구 스파 101호",
    time: "",
    imgURL: "/images/house.png",
    userProfile: "/images/default.png",
    username: "노숙자",
  },
];
const doneState = [
  {
    id: 1,
    state: 2,
    date: "2022.10.31",
    place: "부산 해운대구 스파 101호",
    time: "14:00",
    imgURL: "/images/house.png",
    userProfile: "/images/default.png",
    username: "노숙자",
  },
  {
    id: 2,
    state: 2,
    date: "",
    place: "부산 해운대구 스파 101호",
    time: "",
    imgURL: "/images/house.png",
    userProfile: "/images/default.png",
    username: "노숙자",
  },
];

export default function TourState() {
  const router = useRouter();
  const [contractData, setContractData] = useState(waitState);
  const [isType, setIsType] = useState(router.query.type);
  //0:대기 1:진행 2:완료
  const typeData = ["대기", "진행", "완료"];

  const [contractList, setContractList] = useState([]);
  useEffect(() => {}, []);

  return (
    <>
      <div id="process">
        <Header title="신청현황" type="state" />
        <Toolbar />
        <section id="process_header">
          <h2>투어 신청</h2>
          <h3
            className={isType == 0 ? "active" : ""}
            onClick={() => {
              setIsType(0);
              setContractData(waitState);
            }}
          >
            대기
          </h3>
          <h3
            className={isType == 1 ? "active" : ""}
            onClick={() => {
              setIsType(1);
              setContractData(goState);
            }}
          >
            진행
          </h3>
          <h3
            className={isType == 2 ? "active" : ""}
            onClick={() => {
              setIsType(2);
              setContractData(doneState);
            }}
          >
            완료
          </h3>
        </section>
        <section id="contract_body">
          <HostTourContractList />
        </section>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
