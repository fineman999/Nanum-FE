import React from "react";
import Head from "next/head";
import SubHeader from "../../components/common/SubHeader";
import PreviewImageScroll from "../../components/PreviewImageScroll";

import ContentHeader from "../../components/community/ContentHeader";
import ContentBody from "../../components/community/ContentBody";
import CommentList from "../../components/community/CommentList";

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
      </section>
      <style>{`
      .content_section{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
      }
      .content_wrapper {
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
