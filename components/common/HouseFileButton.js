import { Button } from "@mui/material";
import React from "react";

const HouseFileButton = ({ uploadFile }) => {
  return (
    <div className="house_file_button_wrapper">
      <Button variant="contained" component="label">
        파일 업로드
        <input name="houseFile" hidden type="file" onChange={uploadFile} />
      </Button>
    </div>
  );
};

export default HouseFileButton;
