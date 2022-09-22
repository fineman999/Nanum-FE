import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";

const BottomMenu = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={5}
    >
      <BottomNavigation>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Email" icon={<EmailIcon />} />
        <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomMenu;
