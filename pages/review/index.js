import React, { useState } from "react";
import Image from "next/image";
import SubHeader from "../../components/common/SubHeader";
import Footer from "../../components/common/Footer";
import { fireAlert } from "../../components/common/Alert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PreviewImageForm from "../../components/PreviewImageForm";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#f54336",
  },
  "& .MuiRating-iconHover": {
    color: "#f54336",
  },
});

const Review = () => {
  const [reviewForm, setReviewForm] = useState({
    userId: 1,
    nickname: "김철수",
    roomId: 1,
    title: "",
    content: "",
    reviewImgs: [],
    score: 5,
  });

  const handleChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value,
    });
  };

  const addImages = (file) => {
    setReviewForm({
      ...reviewForm,
      reviewImgs: [...reviewForm.reviewImgs, file],
    });
  };

  const removeImages = (index) => {
    const nextReviewImages = [
      ...reviewForm.reviewImgs.slice(0, index),
      ...reviewForm.reviewImgs.slice(index + 1),
    ];

    setReviewForm({
      ...reviewForm,
      reviewImgs: nextReviewImages,
    });
  };

  const handleSubmit = () => {
    if (reviewForm.title === "" || reviewForm.content === "") {
      fireAlert({ icon: "warning", title: "리뷰를 작성해주세요." });
      return null;
    }

    fireAlert({ icon: "success", title: "리뷰 작성 완료" });
  };

  return (
    <>
      <SubHeader title="리뷰" type="review" />
      <section className="review_section">
        <div className="review_form_wrapper">
          <div className="review_form_header">
            <h3 className="title">
              다음 입주자를 위해서
              <br />
              후기를 남겨주세요!!
            </h3>
            <div className="review_icon">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/1469/1469722.png"
                alt="review_heart"
                layout="fill"
              />
            </div>
          </div>
          <div className="review_form_body">
            {/* 평점 */}
            <div className="review_rating">
              <StyledRating
                name="score"
                defaultValue={5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                precision={0.5}
                size="large"
                onChange={handleChange}
              />
            </div>

            {/* 리뷰 제목 */}
            <div className="review_form_title">
              <input
                className="review_title"
                type="text"
                name="title"
                placeholder="제목"
                onChange={handleChange}
                autoFocus
              />
            </div>

            {/* 리뷰 내용 */}
            <div className="review_comment_wrapper">
              <textarea
                className="review_textarea"
                name="content"
                placeholder="살아보니 어떠셨나요...?"
                onChange={handleChange}
                maxLength={255}
              ></textarea>

              <span className="text_count">
                {reviewForm.content.length} / 255
              </span>
            </div>

            {/* 업로드 이미지 미리보기 */}
            <PreviewImageForm
              addImages={addImages}
              removeImages={removeImages}
            />
          </div>
          <div className="review_form_bottom">
            <div className="review_form_btns">
              <button className="review_write_btn" onClick={handleSubmit}>
                리뷰 작성
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <style jsx>
        {`
          .review_form_wrapper {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: 25px;
            background: white;
          }

          .review_form_header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
          }

          .review_icon {
            position: relative;
            width: 72px;
            height: 72px;
          }

          .review_rating {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 25px;
          }

          .review_title {
            box-sizing: border-box;
            width: 100%;
            padding: 10px 15px 10px 15px;
            margin-bottom: 10px;
            border-radius: 10px;
            background: #f5f5f5;
            font-size: 1.4em;
            border: 1px solid rgba(0, 0, 0, 0.2);
          }

          .review_form_body {
            width: 100%;
          }

          .review_comment_wrapper {
            position: relative;
            margin-bottom: 25px;
          }

          .review_textarea {
            box-sizing: border-box;
            width: 100%;
            height: 350px;
            padding: 20px;
            resize: none;
            border-radius: 10px;
            background: #f5f5f5;
            font-size: 1.2em;
            border: 1px solid rgba(0, 0, 0, 0.2);
          }

          .text_count {
            position: absolute;
            bottom: 5px;
            right: 5px;
            padding: 5px;
            color: #76c1b2;
          }

          .review_form_bottom {
            width: 100%;
          }

          .review_form_btns {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .review_write_btn {
            box-sizing: border-box;
            width: 70%;
            padding: 10px;
            font-size: 1em;
            border-radius: 20px;
            background: #76c1b2;
            border: none;
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default Review;
