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
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import authState from "../../state/atom/authState";
import { useRouter } from "next/router";

const UserMenu = ({ menuList, handleClick }) => {
  return (
    <List>
      {menuList &&
        menuList.map((listItem, index) => (
          <Fragment key={listItem.id}>
            <ListItem onClick={() => handleClick(listItem, index)}>
              <Link href={listItem.path || ""}>
                <ListItemButton>
                  <ListItemText primary={listItem.name} />
                </ListItemButton>
              </Link>
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
                      <ListItem
                        key={index}
                        onClick={() => handleClick(listItem, index)}
                      >
                        <Link href={listItem.path || ""}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary={listItem.name} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
    </List>
  );
};

const DrawerMenu = ({ onToggle = false, toggleDrawer }) => {
  const router = useRouter();
  const { isAuth, username } = useRecoilValue(authState);
  const [menuList, setMenuList] = useState([
    { id: 1, name: "홈", path: "/" },
    {
      id: 2,
      name: "커뮤니티",
      sub: {
        open: false,
        menuList: [
          { name: "전체", path: "/community" },
          { name: "자유 게시판" },
          { name: "정보 게시판", path: "/community/info" },
        ],
      },
    },
    {
      id: 3,
      name: "마이페이지",
      sub: {
        open: false,
        menuList: [
          { name: "내 정보", path: "/my" },
          { name: "회원정보 수정", path: "/my/edit" },
          { name: "회원정보 탈퇴", path: "/my/delete" },
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

  const handleLogin = () => {
    router.push("/login");
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
        {isAuth ? (
          <Avatar
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt={username}
            sx={{
              width: 112,
              height: 112,
            }}
          />
        ) : (
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt={username}
            sx={{
              width: 112,
              height: 112,
            }}
          />
        )}

        <Typography
          mt={1}
          sx={{ width: 112, textAlign: "center", fontWeight: "bold" }}
        >
          {username}
        </Typography>
      </Box>
      <Divider />

      <UserMenu menuList={menuList} handleClick={handleClick} />

      <Divider />
      {/* 로그아웃 버튼 */}
      <Box p={1} sx={{ display: "flex", justifyContent: "center" }}>
        {isAuth ? (
          <Button
            variant="text"
            color="secondary"
            sx={{ flexGrow: 1 }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        ) : (
          <Button
            variant="text"
            color="secondary"
            sx={{ flexGrow: 1 }}
            onClick={handleLogin}
          >
            로그인
          </Button>
        )}
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
