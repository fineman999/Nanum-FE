import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import styles from "../styles/PreviewImageForm.module.css";
import { fireAlert } from "./common/Alert";
import addIcon from "../public/icons/ico_preview_image_add.png";
import deleteIcon from "../public/icons/ico_preview_image_delete.png";

const PreviewImageForm = ({
  defaultImages = [],
  addImages,
  removeImages,
  size = 4,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const imgInpRef = useRef(null);

  useEffect(() => {
    if (defaultImages) {
      setPreviewImages([...defaultImages.map((image) => image.imgPath)]);
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

  // 이미지 업로드
  const uploadImage = (e) => {
    if (previewImages.length >= size) {
      fireAlert({
        icon: "warning",
        title: `이미지는 최대 ${size}개까지 업로드할 수 있습니다.`,
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

    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages([...previewImages, reader.result]);
    };
    reader.readAsDataURL(file);

    addImages(file);
  };

  //   이미지 삭제
  const deleteImage = (index) => {
    const nextPreviewImages = [
      ...previewImages.slice(0, index),
      ...previewImages.slice(index + 1),
    ];

    setPreviewImages(nextPreviewImages);
    removeImages(index);
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
      <div className={styles.image_inp}>
        <input
          type="file"
          name="reviewImgs"
          className={styles.image_input}
          accept="image/*"
          multiple
          onChange={uploadImage}
          ref={imgInpRef}
        />
        <div className={styles.image_upload_button} onClick={handleDialog}>
          <Image src={addIcon} alt="temp" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default PreviewImageForm;
