import Image from "next/image";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import styles from "../styles/HouseMainImage.module.css";

const HouseMainImage = ({ preview, uploadImage, mainImageInput }) => {
  const { houseMainImg = "" } = preview;

  return (
    <div className={styles.main_image_preview_wrapper}>
      <div
        className={styles.main_image_preview}
        onClick={() => mainImageInput.current.click()}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {houseMainImg && (
          <Image src={houseMainImg} alt="main_img" layout="fill" />
        )}
        <ImageIcon fontSize="large" sx={{ color: "rgba(85, 85, 85, 0.3)" }} />
      </div>
      <input
        name="houseMainImg"
        type="file"
        style={{ display: "none" }}
        onChange={uploadImage}
        ref={mainImageInput}
      />
    </div>
  );
};

export default HouseMainImage;
