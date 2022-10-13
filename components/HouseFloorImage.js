import React from "react";
import ImageIcon from "@mui/icons-material/Image";

import styles from "../styles/HouseFloorImage.module.css";
import Image from "next/image";

const HouseFloorImage = ({ preview, uploadImage, floorImageInput }) => {
  const { floorPlanImg = "" } = preview;

  return (
    <div className={styles.house_floor_wrapper}>
      <div
        className={styles.house_floor_preview}
        onClick={() => floorImageInput.current.click()}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {floorPlanImg && (
          <Image src={floorPlanImg} alt="main_img" layout="fill" />
        )}
        <ImageIcon fontSize="large" sx={{ color: "rgba(85, 85, 85, 0.3)" }} />
      </div>
      <input
        name="floorPlanImg"
        type="file"
        style={{ display: "none" }}
        onChange={uploadImage}
        ref={floorImageInput}
      />
    </div>
  );
};

export default HouseFloorImage;
