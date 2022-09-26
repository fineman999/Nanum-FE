import Header from "../../components/common/Header";
import css from "styled-jsx/css";

const tempChat = [
  {
    id: 1,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월26일",
  },
  {
    id: 2,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월25일",
  },
  {
    id: 3,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월24일",
  },
  {
    id: 4,
    img: "/images/default.png",
    username: "캉민수",
    text: "오늘 야자 몇시?",
    date: "9월20일",
  },
];
const style = css`
  #chatlist {
    background-color: #edf1f1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 92.5vh;
    padding: 5rem 0rem;
    box-sizing: border-box;
  }
`;
export default function ChatList() {
  return (
    <>
      <div id="chatlist">
        <Header title="채팅" type="chat" />
        <div id="chat_ul">
          {tempChat &&
            tempChat.map((item) => (
              <div key={item.id}>
                <img src={item.img} />
                <h3>{item.username}</h3>
                <p> {item.date}</p>
                <p>{item.text}</p>
              </div>
            ))}
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
