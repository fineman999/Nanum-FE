import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";

const menuList = ["HOME", "COMMUNITY", "ACCOUNT", "FAQ"];

const DrawerMenu = ({ onToggle, toggleDrawer }) => {
  return (
    <Drawer
      anchor="right"
      open={onToggle}
      PaperProps={{ sx: { width: "75%" } }}
      transitionDuration={{ appear: 300, enter: 300, exit: 300 }}
    >
      <Box p={2}>
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Christopher Campbell"
          sx={{
            width: 112,
            height: 112,
            bgcolor: deepOrange[500],
          }}
        >
          C
        </Avatar>
        <Typography
          mt={1}
          sx={{ width: 112, textAlign: "center", fontWeight: "bold" }}
        >
          노숙자
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuList &&
          menuList.map((listItem) => (
            <ListItemButton>
              <ListItemText primary={listItem} onClick={toggleDrawer} />
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
