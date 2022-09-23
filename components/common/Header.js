import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import PropTypes from "prop-types";
import DrawerMenu from "./DrawerMenu";

function ShowOnScroll({ children }) {
  let trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

ShowOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = ({ title }) => {
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
        <AppBar
          sx={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            background: "transparent",
            boxShadow: "none",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(1.9px)",
            border: "1px solid rgba(255, 255, 255, 0.41)",
          }}
        >
          <Toolbar id="back-to-top-anchor">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white", fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <IconButton aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <ShowOnScroll>
        <AppBar
          position="fixed"
          sx={{
            background: "white",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black", fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <IconButton aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ShowOnScroll>

      <DrawerMenu onToggle={onToggle} toggleDrawer={toggleDrawer} />
    </header>
  );
};

export default Header;
