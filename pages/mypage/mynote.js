import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { getPostsByUser } from "../../lib/apis/board";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import { displayedAtV2 } from "../../lib/utils/useful-functions";
import MyBoardList from "../../components/MyBoardList";
import * as Api from "../../lib/apis/apiClient";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LastPageComment from "../../components/LastPageComment";
import BottomMenu from "../../components/common/BottomMenu";
import { NotificationAlert } from "../../components/common/NotificationAlert";

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
    color: black;
  }
  #mail_body {
    width: 100%;
    height: 100%;
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

  h3 {
    font-weight: normal;
  }
`;
// const myPosts = [
//   { id: 1, text: "What was name of that song?", date: "9월20일" },
//   { id: 2, text: "What was name of that song?", date: "9월20일" },
//   { id: 3, text: "What was name of that song?", date: "9월20일" },
//   { id: 4, text: "What was name of that song?", date: "9월20일" },
//   { id: 5, text: "What was name of that song?", date: "9월20일" },
// ];

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function MyNoteList() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);

  const [defaultSize, setDefaultSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [myPosts, setMyposts] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [deleteState, setDeleteState] = useState([]);
  async function reactive(cancelToken) {
    getPostsByUser({ userId: userData.id, cancelToken: cancelToken })
      .then((res) => {
        if (res.status === 200) {
          setMyposts(res.data.result.content);
          const { totalPages } = res.data.result;

          setCurPage((prev) => prev + 1);
          setTotalPages(totalPages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    reactive(cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const fetchMoreData = () => {
    if (curPage === totalPages) {
      setHasMore(false);
      return;
    }
    const fetchApi = async () => {
      try {
        const response = await Api.get(
          `https://nanum.site/board-service/api/v1/posts/users/${userData.id}?page=${curPage}&size=${defaultSize}&sort=createAt,desc`,
          ""
        );
        const { content } = response.data.result;

        setMyposts((prev) => {
          return prev.concat(content);
        });
        setCurPage((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  };
  return (
    <>
      <div id="maillist">
        <Header title="내가 쓴 글" type="mail" />

        <div id="mail_header">
          <div id="mail_type">
            <h2>내가 쓴 글 HISTORY</h2>
          </div>
          {/* <p
          // onClick={() => {
          //   setIsUpdate(!isUpdate);
          // }}
          >
            편집
          </p> */}
        </div>
        <div id="mail_body">
          {myPosts.length > 0 ? (
            <InfiniteScroll
              dataLength={myPosts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<LastPageComment />}
            >
              {myPosts &&
                myPosts.map((mail) => (
                  <MyBoardList
                    key={mail.id}
                    title={mail.title}
                    content={mail.content}
                    createAt={mail.createAt}
                    id={mail.id}
                    isUpdate={isUpdate}
                    setDeleteState={setDeleteState}
                  />
                ))}
            </InfiniteScroll>
          ) : (
            ""
          )}
        </div>
        {isUpdate && (
          <div id="delete">
            <div id="delete_btn" style={{ marginRight: "0.1rem" }}>
              선택 삭제
            </div>
            <div id="delete_btn">전체 삭제</div>
          </div>
        )}
      </div>
      <BottomMenu />
      <NotificationAlert />
      <style jsx>{style}</style>
    </>
  );
}
