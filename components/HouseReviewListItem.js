import { Divider } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const HouseReviewListItem = ({ review }) => {
  const [more, setMore] = useState(false);

  return (
    <>
      <li className="review_item">
        <div className="review_summary">
          <div className="review_title">
            <h4 style={{ marginBottom: "5px" }}>{review.title}</h4>
          </div>
          <div className="review_thumnail">
            <Image
              src="https://images.unsplash.com/photo-1536183638923-a000c24b1645"
              alt="temp"
              layout="fill"
              priority
            />
          </div>
        </div>
        {more && (
          <div className="review_detail">
            <div className="review_images_wrapper">
              <div className="review_image">
                <Image
                  src="https://images.unsplash.com/photo-1536183638923-a000c24b1645"
                  alt="temp"
                  layout="fill"
                  priority
                />
              </div>
              <div className="side_reivew_imageList">
                <div className="side_review_image">
                  <Image
                    src="https://images.unsplash.com/photo-1510265119258-db115b0e8172"
                    alt="temp"
                    layout="fill"
                    priority
                  />
                </div>
                <div className="side_review_image">
                  <Image
                    src="https://images.unsplash.com/photo-1627232110195-cd9b1cdf5202"
                    alt="temp"
                    layout="fill"
                    priority
                  />
                </div>
                <div className="side_review_image">
                  <Image
                    src="https://images.unsplash.com/photo-1583004575754-b03eeb342328"
                    alt="temp"
                    layout="fill"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* 리뷰 본문 */}
            <div className="review_content">
              <p>{review.content}</p>
            </div>
            {/* 수정/삭제 */}
          </div>
        )}

        {/* 리뷰 날짜, 작성자, 더보기 버튼 */}
        <div className="review_info">
          <div className="review_date">등록일: {review.regDate}</div>
          <div className="review_author">작성자: {review.author}</div>
          <button className="review_more_btn" onClick={() => setMore(!more)}>
            {more ? "접기" : "더보기"}
          </button>
        </div>
      </li>
      <style jsx>{`
        .review_item {
          margin-bottom: 20px;
        }

        .review_summary {
          display: flex;
          justify-content: space-between;
        }

        .review_detail {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .review_title {
          box-sizing: border-box;
          width: 70%;
          padding: 10px;
        }

        .review_thumnail {
          position: relative;
          width: 20%;
          height: 60px;
        }

        .review_images_wrapper {
          display: flex;
          width: 100%;
          height: 300px;
          margin-bottom: 20px;
        }

        .review_image {
          position: relative;
          width: 70%;
          margin-right: 5px;
        }

        .side_reivew_imageList {
          display: flex;
          flex-direction: column;
          width: 30%;
          height: 100%;
        }

        .side_review_image {
          position: relative;
          width: 100%;
          height: 33.3333%;
          margin-bottom: 5px;
        }

        .side_review_image:last-child {
          margin-bottom: 0px;
        }

        .review_content {
          width: 70%;
          margin: 0 auto;
        }

        .review_info {
          display: flex;
          align-items: center;

          box-sizing: border-box;
          padding: 10px;
          font-size: 0.7em;
          color: #acabab;
        }

        .review_info > * {
          margin-right: 10px;
        }

        .review_more_btn {
          border: none;
          background: none;
          color: #acabab;
          font-size: 0.7em;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default HouseReviewListItem;
