import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const DrawerMenu = ({
  userName = "사용자",
  onToggle = false,
  toggleDrawer,
}) => {
  const [menuList, setMenuList] = useState([
    { id: 1, name: "홈" },
    {
      id: 2,
      name: "커뮤니티",
      sub: {
        open: false,
        menuList: [
          { name: "전체" },
          { name: "자유 게시판" },
          { name: "정보 게시판" },
        ],
      },
    },
    {
      id: 3,
      name: "마이페이지",
      sub: {
        open: false,
        menuList: [
          { name: "내 정보" },
          { name: "회원정보 수정" },
          { name: "회원정보 탈퇴" },
        ],
      },
    },
    {
      id: 4,
      name: "FAQ",
      sub: {
        open: false,
        menuList: [{ name: "자주 묻는 질문" }],
      },
    },
  ]);

  const handleClick = (listItem, index) => {
    if (listItem.sub) {
      const nextMenu = {
        ...listItem,
        sub: { ...listItem.sub, open: !listItem.sub.open },
      };

      const nextMenuList = [
        ...menuList.slice(0, index),
        nextMenu,
        ...menuList.slice(index + 1),
      ];

      setMenuList(nextMenuList);
    } else {
      toggleDrawer();
    }
  };

  const handleLogout = () => {
    toggleDrawer();
  };

  return (
    <Drawer
      anchor="right"
      open={onToggle}
      PaperProps={{ sx: { width: "100%" } }}
    >
      <Box p={2}>
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Christopher Campbell"
          sx={{
            width: 112,
            height: 112,
          }}
        >
          C
        </Avatar>
        <Typography
          mt={1}
          sx={{ width: 112, textAlign: "center", fontWeight: "bold" }}
        >
          {userName}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuList &&
          menuList.map((listItem, index) => (
            <>
              <ListItem
                key={listItem.id}
                onClick={() => handleClick(listItem, index)}
              >
                <ListItemButton>
                  <ListItemText primary={listItem.name} />
                </ListItemButton>
                {/* 하위 메뉴 더보기 */}
                {listItem.sub &&
                  (listItem.sub.open ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {/* 하위 메뉴 리스트 */}
              {listItem.sub && (
                <Collapse in={listItem.sub.open}>
                  <List component="div" disablePadding>
                    {listItem.sub &&
                      listItem.sub.menuList.map((listItem, index) => (
                        <>
                          <ListItem
                            key={index}
                            onClick={() => handleClick(listItem, index)}
                          >
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary={listItem.name} />
                            </ListItemButton>
                          </ListItem>
                        </>
                      ))}
                  </List>
                </Collapse>
              )}
            </>
          ))}
      </List>
      <Divider />
      {/* 로그아웃 버튼 */}
      <Box p={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="text"
          color="secondary"
          sx={{ flexGrow: 1 }}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Box>
    </Drawer>
  );
};

DrawerMenu.propTypes = {
  userName: PropTypes.string,
  onToggle: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

export default DrawerMenu;
