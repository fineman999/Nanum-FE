import { useState } from "react";
import css from "styled-jsx/css";
import {
  displayedASpringMVC,
  displayedAt,
} from "../../lib/utils/useful-functions";
import BigImageModal from "./modal/BigimageModal";
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
    width: 20vh;
    height: 20vh;
    margin: 0rem 0.2rem;
  }
`;

export function SendMessage({ text, time, type }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div id="send" className="message">
        <p id="time">{displayedASpringMVC(time)}</p>
        {type == "MESSAGE" ? (
          <p className="text">{text}</p>
        ) : (
          <img src={text} alt="img" onClick={() => setOpen(true)} />
        )}
      </div>
      <BigImageModal open={open} handleClose={handleClose} image={text} />
      <style jsx>{style}</style>
    </>
  );
}
export function GetMessage({ text, time, nickName, profileImgUrl, type }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div id="get" className="message">
        <div>
          <ProfileImg img={profileImgUrl} name={nickName} size={5} type={1} />
          <p>{nickName}</p>
        </div>
        {type == "MESSAGE" ? (
          <p className="text">{text}</p>
        ) : (
          <img src={text} alt="img" onClick={() => setOpen(true)} />
        )}
        <p>{displayedASpringMVC(time)}</p>
      </div>
      <BigImageModal open={open} handleClose={handleClose} image={text} />
      <style jsx>{style}</style>
    </>
  );
}
