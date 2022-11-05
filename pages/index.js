import { useState } from "react";
import Footer from "../components/common/Footer";
import BottomMenu from "../components/common/BottomMenu";
import GlobalSearch from "../components/common/GlobalSearch";
import Header from "../components/common/Header";
import SearchModal from "../components/common/modal/SearchModal";
import HouseListSwiper from "../components/HouseListSwiper";
import MainSwiper from "../components/MainSwiper";
import MainMap from "../components/common/map/MainMap";
import { NotificationAlert } from "../components/common/NotificationAlert";

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
      <HouseListSwiper title="인기 하우스" />
      <HouseListSwiper title="쉐어 하우스" />
      <HouseListSwiper title="마이룸" />
      <MainMap />
      <Footer />
      <NotificationAlert />
      <BottomMenu />
    </>
  );
}
