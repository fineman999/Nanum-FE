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
import React from "react";
import PropTypes from "prop-types";

function ShowOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

ShowOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = ({ title }) => {
  return (
    <>
      <Box sc={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            boxShadow: "none",
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
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <ShowOnScroll>
        <AppBar
          position="fixed"
          sx={{
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white", fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <IconButton aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ShowOnScroll>
    </>
  );
};

export default Header;
