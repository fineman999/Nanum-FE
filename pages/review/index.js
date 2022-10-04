import React, { useState } from "react";
import SubHeader from "../../components/common/SubHeader";
import Image from "next/image";
import { Rating, styled } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fireAlert } from "../../components/common/Alert";
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
    title: "",
    comment: "",
    images: [],
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e) => {};

  const handleSubmit = () => {
    console.log(reviewForm);
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
            <div className="review_rating">
              <StyledRating
                name="customized-color"
                defaultValue={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                size="large"
              />
            </div>
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
            <textarea
              className="review_textarea"
              name="comment"
              placeholder="살아보니 어떠셨나요...?"
              onChange={handleChange}
            ></textarea>
            <div className="review_form_images">
              <div className="image_list_wrapper">
                <ul className="upload_image_list">
                  <li className="review_image_item">
                    <Image
                      src="https://images.unsplash.com/photo-1664745025858-4fd1c815b224"
                      alt="temp"
                      layout="fill"
                    />
                  </li>
                  <li className="review_image_item">
                    <Image
                      src="https://images.unsplash.com/photo-1585128792020-803d29415281"
                      alt="temp"
                      layout="fill"
                    />
                  </li>
                  <li className="review_image_item">
                    <Image
                      src="https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb"
                      alt="temp"
                      layout="fill"
                    />
                  </li>
                </ul>
              </div>
              <div className="image_inp">
                <input className="image_input" type="file" multiple />
                <div className="image_upload_button">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/401/401061.png"
                    alt="temp"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
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
      <style jsx>
        {`
          .review_section {
            height: 100%;
          }

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

          // 리뷰 평점
          .review_rating {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 25px;
          }

          // 리뷰 제목
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
            margin-bottom: 25px;
          }

          //   이미지 업로드
          .review_form_images {
            display: flex;
            height: 72px;
            margin-bottom: 25px;
          }

          .image_list_wrapper {
            overflow: auto;
          }

          .upload_image_list {
            display: flex;
            width: 280px;
            height: 100%;
          }

          .review_image_item {
            position: relative;
            width: 74px;
            height: 100%;
            margin-right: 3px;
          }

          .image_inp {
            position: relative;
            width: 80px;
            margin-left: 3px;
          }

          .image_input {
            width: 100%;
            height: 100%;
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
