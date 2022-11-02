import { fontSize } from "@mui/system";
import { useState } from "react";
import css from "styled-jsx/css";
import {
  displayedASpringMVC,
  displayedAt,
} from "../../lib/utils/useful-functions";
import { ProfileImg } from "./Profile";
import BigImageModal from "./modal/BigImageModal";
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
  #get .text:after {
    border-top: 15px solid #333333;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;

    position: absolute;
    top: 10px;
    left: -15px;
  }

  #send .text {
    background-color: #92aaff;
    margin-left: 0.5rem;
    max-width: 60%;
    word-break: break-all;
  }
  #send p {
    margin-left: auto;
  }
  #send span {
    margin-left: auto;
  }
  #send #time {
    text-align: right;
  }
  #get .text {
    background-color: #ffcfcf;
    margin-right: 0.5rem;
    word-break: break-all;
  }
  img {
    width: 20vh;
    height: 20vh;
    margin: 0rem 0.2rem;
  }
  #image {
    width: 20vh;
    height: 20vh;
    margin: 0rem 0.2rem;
  }
  #emoticon {
    width: 10vh;
    height: 10vh;
    border-radius: 4vh;
  }
  .count {
    color: orange;
    overflow: hidden;
    white-space: nowrap;
  }
  p {
    font-size: 0.8rem;
  }
`;

export function SendMessage({ text, time, type, count }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div id="send" className="message">
        <span>
          <p
            id="sendClass"
            className="count sendClass"
            style={{ marginLeft: "3rem" }}
          >
            {count}
          </p>
          <p id="time">{displayedASpringMVC(time)}</p>
        </span>
        {type == "MESSAGE" ? (
          <p className="text">{text}</p>
        ) : type == "EMOTICON" ? (
          <img
            id="emoticon"
            src={text}
            alt="img"
            onClick={() => setOpen(true)}
          />
        ) : (
          <img id="image" src={text} alt="img" onClick={() => setOpen(true)} />
        )}
      </div>
      <BigImageModal open={open} handleClose={handleClose} image={text} />
      <style jsx>{style}</style>
    </>
  );
}
export function GetMessage({
  text,
  time,
  nickName,
  profileImgUrl,
  type,
  count,
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div id="get" className="message">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ProfileImg img={profileImgUrl} name={nickName} size={5} type={2} />
          <p>{nickName}</p>
        </div>

        {type == "MESSAGE" ? (
          <p className="text">{text}</p>
        ) : type == "EMOTICON" ? (
          <img
            id="emoticon"
            src={text}
            alt="img"
            onClick={() => setOpen(true)}
          />
        ) : (
          <img id="image" src={text} alt="img" onClick={() => setOpen(true)} />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "0.5rem",
          }}
        >
          <p className="count">{count}</p>
          <p>{displayedASpringMVC(time)}</p>
        </div>
      </div>
      <BigImageModal open={open} handleClose={handleClose} image={text} />
      <style jsx>{style}</style>
    </>
  );
}
