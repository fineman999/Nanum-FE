import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { authState, userState } from "../../state/atom/authState";
import { useRouter } from "next/router";
import { logout } from "../../lib/apis/auth";

const areaList = [
  { id: 1, name: "전국", value: "all", houseNumber: 1700 },
  { id: 2, name: "서울", value: "seoul", houseNumber: 100 },
  { id: 3, name: "경기", value: "gyeong-gi", houseNumber: 100 },
  { id: 4, name: "인천", value: "incheon", houseNumber: 100 },
  { id: 5, name: "부산", value: "busan", houseNumber: 100 },
  { id: 6, name: "대구", value: "daegu", houseNumber: 100 },
  { id: 7, name: "대전", value: "daejeon", houseNumber: 100 },
  { id: 8, name: "경남", value: "gyeongnam", houseNumber: 100 },
  { id: 9, name: "전남", value: "jeonnam", houseNumber: 100 },
  { id: 10, name: "충남", value: "chungnam", houseNumber: 100 },
  { id: 11, name: "광주", value: "goyang", houseNumber: 100 },
  { id: 12, name: "울산", value: "ulsan", houseNumber: 100 },
  { id: 13, name: "경북", value: "gyeongbug", houseNumber: 100 },
  { id: 14, name: "전북", value: "jeonbug", houseNumber: 100 },
  { id: 15, name: "충북", value: "chungbug", houseNumber: 100 },
  { id: 16, name: "강원", value: "gang-won", houseNumber: 100 },
  { id: 17, name: "제주", value: "jejudo", houseNumber: 100 },
  { id: 18, name: "세종", value: "sejong", houseNumber: 100 },
];

const UserMenu = ({ menuList, handleClick }) => {
  const [onSubMenu, setOnSubMenu] = useState(false);

  return (
    <List>
      <ListItem>
        <ListItemButton>
          <ListItemText primary="홈" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemText primary="지역별" />
        </ListItemButton>
        {/* 하위 메뉴 더보기 */}
        {onSubMenu ? (
          <ExpandLess onClick={() => setOnSubMenu(false)} />
        ) : (
          <ExpandMore onClick={() => setOnSubMenu(true)} />
        )}
      </ListItem>
      {/* 하위 메뉴 리스트 */}
      <Collapse in={onSubMenu}>
        <List component="div" disablePadding>
          {areaList &&
            areaList.map((listItem, index) => (
              <ListItem key={listItem.id}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={listItem.name} />
                  <Chip
                    label={listItem.houseNumber}
                    sx={{
                      border: "1px solid #f5f5f5",
                      color: "rgba(0,0,0,0.5)",
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Collapse>
      {menuList &&
        menuList.map((listItem, index) => (
          <Fragment key={listItem.id}>
            <ListItem onClick={() => handleClick(listItem, index)}>
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
                      <Fragment key={index}>
                        <ListItem onClick={() => handleClick(listItem, index)}>
                          <Link href={listItem.path || ""}>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary={listItem.name} />
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      </Fragment>
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
  const [userData, setUserData] = useRecoilState(userState);
  const [authData, setAuthData] = useRecoilState(authState);
  const [role, setRole] = useState("");
  const isLogin = authData.isLogin;
  const [menuList, setMenuList] = useState([]);

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
    logout();
    setAuthData({ isLogin: false });
    toggleDrawer();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(sessionStorage.getItem("role"));
      setMenuList([
        // { id: 1, name: "홈", path: "/" },
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
              {
                name: "내 정보",
                path: isLogin
                  ? sessionStorage.getItem("role") == "USER"
                    ? "/mypage"
                    : "/host"
                  : "/login",
              },
              { name: "설정", path: isLogin ? "/mypage/setting" : "/login" },
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
    }
  }, []);

  return (
    <Drawer
      anchor="right"
      open={onToggle}
      PaperProps={{ sx: { width: "100%" } }}
      sx={{ zIndex: "1300" }}
    >
      <Box p={2}>
        {authData.isLogin && userData.profileImgUrl !== "" ? (
          <Avatar
            src={userData.profileImgUrl}
            alt={userData.nickName}
            sx={{
              width: 112,
              height: 112,
            }}
          />
        ) : (
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="default_img"
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
          {authData.isLogin ? <>{userData.nickName}</> : <></>}
        </Typography>
        <IconButton
          onClick={toggleDrawer}
          sx={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <UserMenu menuList={menuList} handleClick={handleClick} />
      <Divider />
      {/* 로그아웃 버튼 */}
      <Box p={1} sx={{ display: "flex", justifyContent: "center" }}>
        {authData.isLogin ? (
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
