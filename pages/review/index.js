import React, { useRef, useState } from "react";
import SubHeader from "../../components/common/SubHeader";
import Image from "next/image";
import { Rating, styled } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fireAlert } from "../../components/common/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../../components/common/Footer";
import BottomMenu from "../../components/common/BottomMenu";
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

  const [previewImages, setPreviewImages] = useState([]); // 업로드 이미지 미리보기
  const imgInpRef = useRef(null);

  const handleChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value,
    });
  };

  // 이미지 파일 유효성 검사
  const fileValidate = (filePath) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
      return false;
    } else {
      return true;
    }
  };

  const uploadImage = (e) => {
    if (previewImages.length >= 4) {
      fireAlert({
        icon: "warning",
        title: "이미지는 최대 4개까지 업로드할 수 있습니다.",
      });
      return null;
    }

    if (!fileValidate(e.target.value)) {
      fireAlert({
        icon: "warning",
        title: "유효하지 않은 파일입니다.",
      });
      return null;
    }

    console.log(e.target.files);
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages([...previewImages, reader.result]);
    };
    reader.readAsDataURL(file);

    setReviewForm({
      ...reviewForm,
      [e.target.name]: [...reviewForm.reviewImgs, ...e.target.files],
    });
  };

  const deleteImage = (index) => {
    const nextPreviewImages = [
      ...previewImages.slice(0, index),
      ...previewImages.slice(index + 1),
    ];
    const nextReviewImages = [
      ...reviewForm.reviewImgs.slice(0, index),
      ...reviewForm.reviewImgs.slice(index + 1),
    ];

    setPreviewImages(nextPreviewImages);
    setReviewForm({
      ...reviewForm,
      reviewImgs: nextReviewImages,
    });
  };

  const handleDialog = () => {
    imgInpRef.current.click();
  };

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
                name="score"
                defaultValue={5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                precision={0.5}
                size="large"
                onChange={handleChange}
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

            <div className="review_form_images">
              {/* 업로드된 이미지 미리보기 */}
              <div className="upload_image_preview">
                <ul className="upload_image_list">
                  {previewImages &&
                    previewImages.map((preview, index) => (
                      <li className="review_image_item" key={index}>
                        <img
                          src={preview}
                          alt="temp"
                          width="100%"
                          height="100%"
                        />
                        <div
                          className="review_image_delete_ico"
                          onClick={() => deleteImage(index)}
                        >
                          <Image
                            src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                            alt="temp"
                            layout="fill"
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="image_inp">
                <input
                  type="file"
                  name="reviewImgs"
                  className="image_input"
                  accept="image/*"
                  multiple
                  onChange={uploadImage}
                  ref={imgInpRef}
                />
                <div className="image_upload_button" onClick={handleDialog}>
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

          .review_form_images {
            display: flex;
            width: 100%;
            height: 72px;
            margin-bottom: 25px;
          }

          .upload_image_preview {
            overflow-x: auto;
          }

          .upload_image_list {
            display: inline-flex;
            flex-wrap: nowrap;
            height: 100%;
          }

          .review_image_item {
            position: relative;
            width: 74px;
            height: 100%;
            margin-right: 3px;
          }

          .review_image_delete_ico {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 20px;
            height: 20px;
            cursor: pointer;
          }

          .image_inp {
            position: relative;
            width: 90px;
            margin-left: 3px;
          }

          .image_input {
            display: none;
            width: 100%;
            height: 100%;
          }

          .image_upload_button {
            position: relative;
            width: 74px;
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
