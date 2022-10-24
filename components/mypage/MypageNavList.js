import React from "react";
import Link from "next/link";

import styles from "../../styles/MypageNavList.module.css";
import Image from "next/image";

const MypageNavList = () => {
  return (
    <div className="nav_list_wrapper">
      <ul className="nav_list">
        <li className={styles.list_item}>
          <div className={styles.myroom_info}>
            <div className={styles.myroom_header}>
              <h3>마이룸</h3>
              <Link href="/mypage/myroom">
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
        <li className={styles.list_item}>
          <Link href="/mypage/moves">입주신청현황</Link>
        </li>
        <li className={styles.list_item}>
          <Link href="/mypage/tours">투어신청현황</Link>
        </li>
      </ul>
    </div>
  );
};

export default MypageNavList;
