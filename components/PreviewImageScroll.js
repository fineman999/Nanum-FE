import Image from "next/image";
import React from "react";

import styles from "../styles/PreviewImageScroll.module.css";

const PreviewImageScroll = () => {
  return (
    <div className={styles.preview_image_scroll_wrapper}>
      <ul className={styles.image_list}>
        <li className={styles.image_item}>
          <Image src="/images/house_image_1.jpg" alt="temp" layout="fill" />
        </li>
        <li className={styles.image_item}>
          <Image src="/images/house_image_2.jpg" alt="temp" layout="fill" />
        </li>
        <li className={styles.image_item}>
          <Image src="/images/house_image_3.jpg" alt="temp" layout="fill" />
        </li>
        <li className={styles.image_item}>
          <Image src="/images/house_image_4.jpg" alt="temp" layout="fill" />
        </li>
        <li className={styles.image_item}>
          <Image src="/images/house_image_5.jpg" alt="temp" layout="fill" />
        </li>
        <li className={styles.image_item}>
          <Image src="/images/house_image_6.jpg" alt="temp" layout="fill" />
        </li>
      </ul>
    </div>
  );
};

export default PreviewImageScroll;
