import React from "react";
import SubHeader from "../../components/common/SubHeader";
import MyMoveList from "../../components/mypage/MyMoveList";
const moves = () => {
  return (
    <>
      <SubHeader title="입주 신청 현황" type="moves" />
      <MyMoveList />
    </>
  );
};

export default moves;
