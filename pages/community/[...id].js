import React from "react";
import Head from "next/head";
import SubHeader from "../../components/common/SubHeader";
import PreviewImageScroll from "../../components/PreviewImageScroll";

import ContentHeader from "../../components/community/ContentHeader";
import ContentBody from "../../components/community/ContentBody";
import CommentList from "../../components/community/CommentList";
import { Toolbar } from "@mui/material";
import CommentToolbar from "../../components/community/CommentToolbar";

const Article = () => {
  return (
    <>
      <Head>
        <title>게시글 조회</title>
      </Head>
      <SubHeader title="게시글 조회" type="article" />
      <section className="content_section">
        <div className="content_wrapper">
          <ContentHeader />
          <ContentBody />
          <PreviewImageScroll />
          <CommentList />
        </div>
        <CommentToolbar />
      </section>
      <style>{`
      .content_section{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
      }
      .content_wrapper {
        box-sizing: border-box;
        width: 100%;
        padding: 15px;
        background-color: white;
        border-radius: 15px;
        margin-bottom: 20px;
      }
      `}</style>
    </>
  );
};

export default Article;
