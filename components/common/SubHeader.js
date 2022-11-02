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
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMenu from "./DrawerMenu";

const SubHeader = ({ title = "제목", type = "main", board = false }) => {
  const router = useRouter();
  const [onToggle, setOnToggle] = useState(false);

  const toggleDrawer = () => {
    setOnToggle(!onToggle);
  };
  const handleSearch = () => {
    router.push({
      pathname: `/community/search`,
    });
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
            zIndex: "1300",
          }}
        >
          <Toolbar>
            {type !== "main" ? (
              <IconButton
                sx={{ padding: "0px", marginRight: "10px" }}
                onClick={() => {
                  if (type === "chooseType") {
                    router.push("/");
                  } else {
                    router.back();
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            ) : (
              ""
            )}
            {board ? (
              <>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color: "#555555",
                    fontWeight: "bold",
                    textAlign: `${type !== "main" ? "center" : "left"}`,
                    marginLeft: "2rem",
                  }}
                >
                  {title}
                </Typography>

                <IconButton aria-label="add an alarm" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
                <IconButton aria-label="menu" onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <>
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
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <DrawerMenu onToggle={onToggle} toggleDrawer={toggleDrawer} />
    </header>
  );
};

export default SubHeader;
