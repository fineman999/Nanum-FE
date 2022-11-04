import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const style = {
  position: "absolute",
  left: "95%",
  transform: "translate(-95%,0)",
  bottom: "80px",
  backgroundColor: "#fff",
  width: "2.3rem",
  height: "2rem",
  borderRadius: "2rem",
};
const ScrollTop = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Fab onClick={handleClick} sx={style}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Fade>
  );
};

const FloatingButton = () => {
  return (
    <ScrollTop />
    //   <Fab size="small" aria-label="scroll back to top" sx={style}>
    //     <KeyboardArrowUpIcon />
    //   </Fab>
    // </ScrollTop>
  );
};

export default FloatingButton;
