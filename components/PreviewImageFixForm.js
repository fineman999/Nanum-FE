import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import styles from "../styles/PreviewImageForm.module.css";
import { fireAlert } from "./common/Alert";
import addIcon from "../public/icons/ico_preview_image_add.png";
import deleteIcon from "../public/icons/ico_preview_image_delete.png";

const PreviewImageFixForm = ({
  defaultImages,
  addImages,
  removeImagesFix,
  size = 4,
  type,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const imgInpRef = useRef(null);

  useEffect(() => {
    if (defaultImages) {
      setPreviewImages([...defaultImages.map((image) => image.imgUrl)]);
    }
  }, [defaultImages]);

  // 이미지 파일 유효성 검사
  const fileValidate = (filePath) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
      return false;
    } else {
      return true;
    }
  };

  //   이미지 삭제
  const deleteImage = (index) => {
    const nextPreviewImages = [
      ...previewImages.slice(0, index),
      ...previewImages.slice(index + 1),
    ];
    // previewImages.filter(idx=>idx===index)
    setPreviewImages([...nextPreviewImages]);
    removeImagesFix(index);
    console.log("previewImages", previewImages);
  };

  const handleDialog = () => {
    imgInpRef.current.click();
  };

  return (
    <div className={styles.form_images}>
      {/* 업로드된 이미지 미리보기 */}
      <div className={styles.upload_image_preview}>
        <ul className={styles.upload_image_list}>
          {previewImages &&
            previewImages.map((preview, index) => (
              <li className={styles.review_image_item} key={index}>
                <img src={preview} alt="temp" width="100%" height="100%" />
                <div
                  className={styles.review_image_delete_ico}
                  onClick={() => deleteImage(index)}
                >
                  <Image src={deleteIcon} alt="temp" layout="fill" />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PreviewImageFixForm;
