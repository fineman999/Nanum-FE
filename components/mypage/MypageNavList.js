import React from "react";
import Link from "next/link";

import styles from "../../styles/MypageNavList.module.css";
import Image from "next/image";

const MypageNavList = () => {
  return (
    <div className="nav_list_wrapper">
      <ul className="nav_list">
        {/* 마이룸 버튼 */}
        <li className={styles.list_item}>
          <div className={styles.myroom_info}>
            <div className={styles.myroom_header}>
              <h3>마이룸</h3>
              <Link href="/mypage/myroom">
                <div className={styles.moreBtn}>더보기</div>
              </Link>
            </div>
            <div className="myroom_body"></div>
          </div>
          <div className={styles.myroom_image}>
            <Image
              src="https://images.unsplash.com/photo-1486946255434-2466348c2166"
              alt="temp_image"
              layout="fill"
            />
          </div>
        </li>
        {/* 입주 신청 현황 버튼 */}
        <li className={styles.list_item}>
          <div className={styles.myroom_info}>
            <div className={styles.myroom_header}>
              <h3>입주신청현황</h3>
              <Link href="/mypage/moves">
                <a className={styles.moreBtn}>더보기</a>
              </Link>
            </div>
          </div>
          <div className={styles.myroom_image}>
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
              alt="temp_image"
              layout="fill"
            />
          </div>
        </li>
        {/* 투어 신청 현황 버튼 */}
        <li className={styles.list_item}>
          <div className={styles.myroom_info}>
            <div className={styles.myroom_header}>
              <h3>투어신청현황</h3>
              <Link href="/mypage/tours">
                <a className={styles.moreBtn}>더보기</a>
              </Link>
            </div>
          </div>
          <div className={styles.myroom_image}>
            <Image
              src="https://images.unsplash.com/photo-1481277542470-605612bd2d61"
              alt="temp_image"
              layout="fill"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MypageNavList;
