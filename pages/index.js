import { Box, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import BottomMenu from "../components/common/BottomMenu";
import Footer from "../components/common/Footer";
import GlobalSearch from "../components/common/GlobalSearch";
import Header from "../components/common/Header";
import SearchModal from "../components/common/modal/SearchModal";
import HouseList from "../components/HouseList";
import MainSwiper from "../components/MainSwiper";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header title="NANUM" />
      <MainSwiper />
      <GlobalSearch handleOpen={handleOpen} />
      <SearchModal open={open} handleClose={handleClose} />
      <HouseList title="인기 하우스" />
      <HouseList title="쉐어 하우스" />
      <HouseList title="마이룸" />
      <Footer />
      <BottomMenu />
    </>
  );
}
