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
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMenu from "./DrawerMenu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#edf1f1",
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "14ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  width: "100%",
}));
const SearchHeader = ({
  title = "제목",
  type = "main",
  board = false,
  setSearch,
  search,
  handleSendSearch,
  setSlideState,
}) => {
  const router = useRouter();
  const [onToggle, setOnToggle] = useState(false);

  const toggleDrawer = () => {
    setOnToggle(!onToggle);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleCancel = (e) => {
    setSearch("");
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
                  setSlideState(false);
                  setTimeout(() => {
                    router.back();
                  }, 200);
                  //
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            ) : (
              ""
            )}
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "gray" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
                value={search}
              />
            </Search>
            <IconButton onClick={handleCancel} sx={{ marginLeft: "0.5rem" }}>
              <HighlightOffIcon />
            </IconButton>
            <IconButton onClick={handleSendSearch}>
              <CheckCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <DrawerMenu onToggle={onToggle} toggleDrawer={toggleDrawer} />
    </header>
  );
};

export default SearchHeader;
