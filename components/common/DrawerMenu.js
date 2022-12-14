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
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState, userState } from "../../state/atom/authState";
import { useRouter } from "next/router";
import { logout } from "../../lib/apis/auth";
import axios from "axios";
import likeCountState from "../../state/atom/likeCountState";

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const UserMenu = ({ menuList, handleClick, areaList, handleRegion }) => {
  const [onSubMenu, setOnSubMenu] = useState(false);
  const router = useRouter();

  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => router.push("/")}>
          <ListItemText primary="홈" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => setOnSubMenu(!onSubMenu)}>
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
              <ListItem key={index}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleRegion(listItem.region)}
                >
                  <ListItemText primary={listItem.region} />
                  <Chip
                    label={listItem.houseCount}
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
  const [areaList, setAreaList] = useState([]);
  const setLikeCount = useSetRecoilState(likeCountState);
  useEffect(() => {
    const API_URI = `/houses/search/regions`;

    axios.get(BASE_URL + API_URI).then((res) => {
      const { status } = res;
      const { isSuccess, message, result } = res.data;
      if (status === 200 && isSuccess) {
        setAreaList(result);
      }
    });
    // get(BASE_URL, API_URI).then((res) => setAreaList(res.data.result));
  }, []);

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
    setLikeCount(0);
    setAuthData({ isLogin: false });
    toggleDrawer();
    router.push("/");
  };

  const handleRegion = (region) => {
    router.push({
      pathname: "/house/region",
      query: {
        region: region,
      },
    });
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
              { name: "공지 게시판", path: "/community/board/notice" },
              { name: "자유 게시판", path: "/community/board/all" },
              { name: "정보 게시판", path: "/community/board/info" },
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
      <UserMenu
        menuList={menuList}
        handleClick={handleClick}
        areaList={areaList}
        handleRegion={handleRegion}
      />
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
