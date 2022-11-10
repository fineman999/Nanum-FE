import React, { useEffect, useState } from "react";
import Head from "next/head";
import SubHeader from "../../../components/common/SubHeader";
import PreviewImageScroll from "../../../components/PreviewImageScroll";

import ContentHeader from "../../../components/community/ContentHeader";
import ContentBody from "../../../components/community/ContentBody";
import CommentList from "../../../components/community/CommentList";
import { Divider } from "@mui/material";
import CommentToolbar from "../../../components/community/CommentToolbar";
import ContentFooter from "../../../components/community/ContentFooter";
import { getBoard } from "../../../lib/apis/board";
import { useRouter } from "next/router";
import axios from "axios";
import * as Api from "../../../lib/apis/apiClient";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, userState } from "../../../state/atom/authState";
import { NotificationAlert } from "../../../components/common/NotificationAlert";
const Article = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newComment, setNewComment] = useState();
  const authValue = useRecoilValue(authState);
  const [newReply, setNewReply] = useState();
  const [board, setBoard] = useState({});
  const [inputCommnet, setInputCommnet] = useState({
    open: false,
    commentId: 0,
    replyName: "",
  });

  useEffect(() => {
    const cancleToken = axios.CancelToken.source();
    async function reactive() {
      try {
        const getBoards = await Api.get(
          `https://nanum.site/board-service/api/v1/posts/`,
          router.query.id
        );
        setBoard(getBoards.data.result);

        if (!getBoards) {
          throw new Error(`${getBoards} not allowd`);
        }
        return getBoards;
      } catch (e) {
        console.log("Error" + e);
      }
    }
    if (router.query.id !== undefined) reactive();

    return () => {
      cancleToken.cancel();

      if (!router.isReady) return;
    };
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>게시글 조회</title>
      </Head>
      <SubHeader title="게시글 조회" type="article" />
      <section className="content_section">
        <div className="content_wrapper">
          <ContentHeader
            boardId={router.query.id}
            boardUserId={board.userId}
            nickName={board.nickName}
            createAt={board.createAt}
            viewCount={board.viewCount}
            profileImgUrl={board.profileImgUrl}
            userId={board.userId}
            categoryId={board.categoryId}
          />
          <ContentBody title={board.title} content={board.content} />
          <PreviewImageScroll imageList={board.imgUrls} date={board.createAt} />
          {/* 좋아요, 공유 버튼 */}
          <ContentFooter />
          <Divider />
          <CommentList
            boardId={router.query.id}
            newComment={newComment}
            setInputCommnet={setInputCommnet}
            inputCommnet={inputCommnet}
            newReply={newReply}
          />
        </div>
        {authValue.isLogin ? (
          <CommentToolbar
            boardId={id}
            setNewComment={setNewComment}
            newComment={newComment}
            inputCommnet={inputCommnet}
            setInputCommnet={setInputCommnet}
            setNewReply={setNewReply}
          />
        ) : (
          ""
        )}
      </section>

      <style jsx>{`
        .content_section {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          padding: 20px;
        }
        .content_wrapper {
          box-sizing: border-box;
          width: 100%;
          background-color: white;
          border-radius: 15px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default Article;
