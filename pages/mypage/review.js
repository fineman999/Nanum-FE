import React from "react";
import BottomMenu from "../../components/common/BottomMenu";
import Footer from "../../components/common/Footer";
import SubHeader from "../../components/common/SubHeader";
import HouseReviewList from "../../components/HouseReviewList";

const review = () => {
  return (
    <>
      <SubHeader title="리뷰 내역" type="review" />
      <HouseReviewList />
      <Footer />
      <BottomMenu />
    </>
  );
};

export default review;
