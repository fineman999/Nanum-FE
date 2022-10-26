import Image from "next/image";
import React, { useState } from "react";

import styles from "../styles/PreviewImageScroll.module.css";
import BoardModal from "./common/modal/BoardModal";
import GalleryModal from "./common/modal/GalleryModal";

const PreviewImageScroll = ({ imageList, date }) => {
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
              <img
                src={image.imgUrl}
                alt={image.imagId}
                style={{
                  width: `10vh`,
                  height: `10vh`,
                  borderRadius: "0.5rem",
                }}
              />
            </li>
          ))}
      </ul>
      {/* <GalleryModal open={gallery} onClose={closeGallery} /> */}
      <BoardModal
        open={gallery}
        handleClose={closeGallery}
        images={imageList}
        date={date}
      />
    </div>
  );
};

export default PreviewImageScroll;
