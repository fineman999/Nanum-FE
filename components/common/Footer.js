import { Container, Divider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Container sx={{ pt: "20px" }}>
        <div className="app_info">
          <ul className="app_info_list">
            <li>앱 소개</li>
            <li>가이드</li>
            <li>개인정보보호정책</li>
            <li>이용약관</li>
          </ul>
          <address className="app_info_detail">
            <div>
              상호 : (주)나눔닷컴 <span>|</span> 대표 : 박찬흠
            </div>
            <div>주소 : 부산광역시 해운대구 우동 1514 센텀리더스마크 401호</div>
            <div>개인정보관리 책임자 : 안대현 (daehyun34@nanum.com)</div>
            <div>사업자 등록번호 : 211-06-76999</div>
            <div>
              통신판매업 신고 : 제 성동 - 3381호
              <span style={{ textDecoration: "underline" }}>
                [사업자 정보 확인]
              </span>
            </div>
          </address>
        </div>
      </Container>
      <style jsx>
        {`
          address {
          }
          footer {
            width: 100%;
            height: 320px;
            background: #555555;
          }

          .app_info {
            color: #f5f5f5;
            font-size: 0.7rem;
          }

          .app_info .app_info_detail > div {
            line-height: 15px;
          }

          .app_info_list {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }

          .app_info_list li {
            flex: 1;
            text-align: center;
            font-size: 0.5rem;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
