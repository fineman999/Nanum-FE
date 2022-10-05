import React from "react";
import HouseReviewListItem from "./HouseReviewListItem";

const reviewData = [
  {
    id: 1,
    title: "역이랑 병원이 가까워서 좋아요",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    images: [{ url: "" }, { url: "" }, { url: "" }],
    regDate: "2022.09.15",
    author: "박*흠",
  },
  {
    id: 2,
    title: "도서관이랑 가까워서 학생한테 딱이에요.",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    images: [{ url: "" }, { url: "" }, { url: "" }],
    regDate: "2022.09.15",
    author: "안*현",
  },
  {
    id: 3,
    title: "주변에 맛있는게 많아요!",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    images: [{ url: "" }, { url: "" }, { url: "" }],
    regDate: "2022.09.15",
    author: "전*정",
  },
  {
    id: 4,
    title: "놀게 많아요!!!",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    images: [{ url: "" }, { url: "" }, { url: "" }],
    regDate: "2022.09.15",
    author: "강*수",
  },
];

const HouseReviewList = () => {
  return (
    <>
      <div className="house_review_list">
        <ul>
          {reviewData &&
            reviewData.map((review) => (
              <HouseReviewListItem key={review.id} review={review} />
            ))}
        </ul>
      </div>
      <style jsx>{`
        .house_review_list {
          background: white;
          box-sizing: border-box;
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default HouseReviewList;
