import Image from "next/image";
import React, { useState } from "react";

import styles from "../styles/PreviewImageScroll.module.css";
import GalleryModal from "./common/modal/GalleryModal";

const imageList = [
  {
    src: "/images/house_image_1.jpg",
    alt: "house_image_1",
  },
  {
    src: "/images/house_image_2.jpg",
    alt: "house_image_2",
  },
  {
    src: "/images/house_image_3.jpg",
    alt: "house_image_3",
  },
  {
    src: "/images/house_image_4.jpg",
    alt: "house_image_4",
  },
  {
    src: "/images/house_image_5.jpg",
    alt: "house_image_5",
  },
  {
    src: "/images/house_image_6.jpg",
    alt: "house_image_6",
  },
];

const PreviewImageScroll = () => {
  const [gallery, setGallery] = useState(false);

  const openGallery = () => {
    setGallery(true);
  };

  const closeGallery = () => {
    setGallery(false);
  };

  return (
    <div className={styles.preview_image_scroll_wrapper}>
      <ul className={styles.image_list}>
        {imageList &&
          imageList.map((image, index) => (
            <li key={index} className={styles.image_item} onClick={openGallery}>
              <Image src={image.src} alt={image.alt} layout="fill" />
            </li>
          ))}
      </ul>
      <GalleryModal open={gallery} onClose={closeGallery} />
    </div>
  );
};

export default PreviewImageScroll;
