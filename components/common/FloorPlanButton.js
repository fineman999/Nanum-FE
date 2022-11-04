import { Button } from "@mui/material";
import React from "react";

const FloorPlanButton = ({ uploadImage }) => {
  return (
    <div className="floor_plan_button_wrapper">
      <Button variant="contained" component="label">
        사진 업로드
        <input
          name="floorPlanImg"
          hidden
          accept="image/*"
          type="file"
          onChange={uploadImage}
        />
      </Button>
    </div>
  );
};

export default FloorPlanButton;
