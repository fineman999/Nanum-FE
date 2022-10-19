import css from "styled-jsx/css";
import { displayedAt } from "../../lib/utils/useful-functions";
import { ProfileImg } from "./Profile";

//pink:ffcfcf
//puple:92aaff
const style = css`
  .text {
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 30px;
  }
  .message {
    display: flex;
    align-items: center;
    margin: 0.2rem 0rem;
  }

  #send .text {
    background-color: #92aaff;
    margin-left: 0.5rem;
    max-width: 60%;
  }
  #send p {
    margin-left: auto;
  }
  #send #time {
    text-align: right;
  }
  #get .text {
    background-color: #ffcfcf;
    margin-right: 0.5rem;
  }
  img {
    width: 5vh;
    height: 5vh;
    margin-right: 0.2rem;
  }
`;

export function SendMessage({ text, time }) {
  return (
    <>
      <div id="send" className="message">
        <p id="time">{displayedAt(time)}</p>
        <p className="text">{text}</p>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
export function GetMessage({ text, time, nickName, profileImgUrl }) {
  return (
    <>
      <div id="get" className="message">
        <div>
          <ProfileImg img={profileImgUrl} name={nickName} size={5} type={1} />

          <p>{nickName}</p>
        </div>
        <p className="text">{text}</p>
        <p>{displayedAt(time)}</p>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
