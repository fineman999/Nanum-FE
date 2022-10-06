import React from "react";
import { Box, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const WriteButton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      <Fab aria-label="edit">
        <EditIcon />
      </Fab>
    </Box>
  );
};

export default WriteButton;
