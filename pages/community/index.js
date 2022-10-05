import React from "react";
import SubHeader from "../../components/common/SubHeader";
import BottomMenu from "../../components/common/BottomMenu";
import NoticeCategory from "../../components/NoticeCategory";

const Community = () => {
  return (
    <>
      <SubHeader title="커뮤니티" type="community" />
      {/* 커뮤니티 카테고리 */}
      <NoticeCategory />

      <div className="all">
        <div className="category_header">
          <h2>전체게시판</h2>
        </div>
      </div>

      <div className="info">
        <div className="category_header">
          <h2>정보게시판</h2>
        </div>
      </div>
      <BottomMenu />
    </>
  );
};

export default Community;
