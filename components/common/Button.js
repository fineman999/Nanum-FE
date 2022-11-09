import css from "styled-jsx/css";
const style = css`
  #btn_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    background-color: #76c1b2;
    color: white;
    /* font-size: 1rem; */
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    width: 100%;
    margin: 1rem 0.2rem;
  }
  #back_to_btn {
    background-color: #777777;
  }
`;
//두가지 옵션 버튼 나란히 있을 때 (ex>전송 취소)
export function TwoButtonOption({ text1, text2, handleBtn1, handleBtn2 }) {
  return (
    <>
      <div id="btn_list">
        <button onClick={handleBtn1}>{text1}</button>
        <button id="back_to_btn" onClick={handleBtn2}>
          {text2}
        </button>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
export function OneButton({ text1, handleBtn1, type }) {
  return (
    <>
      <button id={type == 1 ? "" : "back_to_btn"} onClick={handleBtn1}>
        {text1}
      </button>
      <style jsx>{style}</style>
    </>
  );
}
