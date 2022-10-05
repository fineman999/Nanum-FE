import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMenu from "./DrawerMenu";

const SubHeader = ({ title = "제목", type = "main" }) => {
  const router = useRouter();
  const [onToggle, setOnToggle] = useState(false);

  const toggleDrawer = () => {
    setOnToggle(!onToggle);
  };

  return (
    <header>
      <Box
        sx={{
          flexGrow: 1,
          position: "static",
        }}
      >
        <Toolbar id="back-to-top-anchor" />
        <AppBar
          sx={{
            position: "fixed",
            width: "100%",
            boxShadow: "none",
            background: "white",
            borderBottom: "1px solid #f5f5f5",
          }}
        >
          <Toolbar>
            {type !== "main" ? (
              <IconButton
                sx={{ padding: "0px", marginRight: "10px" }}
                onClick={() => router.back()}
              >
                <ArrowBackIcon />
              </IconButton>
            ) : (
              ""
            )}

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "#555555",
                fontWeight: "bold",
                textAlign: `${type !== "main" ? "center" : "left"}`,
              }}
            >
              {title}
            </Typography>
            <IconButton aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <DrawerMenu onToggle={onToggle} toggleDrawer={toggleDrawer} />
    </header>
  );
};

export default SubHeader;
