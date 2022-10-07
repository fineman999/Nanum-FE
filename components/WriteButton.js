import React, { useEffect, useState } from "react";
import { Box, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

const WriteButton = () => {
  const router = useRouter();
  const [params, setParams] = useState([]);

  useEffect(() => {
    setParams([...router.pathname.split("/")]);
  }, []);

  const goToWrite = () => {
    router.push({
      pathname: `/community/${params[3]}/write`,
    });
  };

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
      <Fab aria-label="edit" onClick={goToWrite}>
        <EditIcon />
      </Fab>
    </Box>
  );
};

export default WriteButton;
