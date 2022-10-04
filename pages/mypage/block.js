import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import { useState } from "react";
import { Checkbox } from "@mui/material";

const style = css`
  #blocklist {
    padding: 5rem 0rem;
  }
  #unit_block {
    background-color: #ffff;
    display: flex;
    padding: 2rem 1rem;
    margin-bottom: 0.1rem;
    align-items: center;
    height: 10vh;
    box-sizing: border-box;
    justify-content: space-between;
  }
  img {
    width: 8vh;
    height: 8vh;
    margin-right: 0.5rem;
  }
  #profile {
    display: flex;
    align-items: center;
  }
  #block_header {
    margin: 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
`;
const tempBlockList = [
  {
    id: 1,
    img: "/images/default.png",
    username: "캉민수",
    isBlock: true,
  },
  {
    id: 2,
    img: "/images/default.png",
    username: "캉민수",
    isBlock: true,
  },
  {
    id: 3,
    img: "/images/default.png",
    username: "캉민수",
    isBlock: true,
  },
  {
    id: 4,
    img: "/images/default.png",
    username: "캉민수",
    isBlock: true,
  },
];
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function Block() {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <>
      <div id="blocklist">
        <Header title="차단" type="block" />
        <div id="block_header">
          <h2>차단 목록</h2>
          <p onClick={() => setIsUpdate(!isUpdate)}>편집</p>
        </div>
        {tempBlockList &&
          tempBlockList.map((user) => (
            <div key={user.id} id="unit_block">
              <div id="profile">
                <img src={user.img} />
                <p>{user.username}</p>
              </div>
              <div>{isUpdate && <Checkbox {...label} color="default" />}</div>
            </div>
          ))}
        {isUpdate && (
          <div id="delete">
            <div id="delete_btn" style={{ marginRight: "0.1rem" }}>
              선택 해제
            </div>
            <div id="delete_btn">전체 해제</div>
          </div>
        )}
      </div>
      <style jsx>{style}</style>
    </>
  );
}
