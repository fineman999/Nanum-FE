import { Box, Toolbar, Typography } from "@mui/material";
import BottomMenu from "../components/common/BottomMenu";
import Footer from "../components/common/Footer";
import GlobalSearch from "../components/common/GlobalSearch";
import Header from "../components/common/Header";
import HouseList from "../components/HouseList";
import MainSwiper from "../components/MainSwiper";

export default function Home() {
  return (
    <>
      <Header title="NANUM" />
      <MainSwiper />
      <GlobalSearch />
      <HouseList title="인기 하우스" />
      <HouseList title="쉐어 하우스" />
      <HouseList title="마이룸" />
      <Footer />
      <BottomMenu />
    </>
  );
}
