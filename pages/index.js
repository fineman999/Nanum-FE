import { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import BottomMenu from "../components/common/BottomMenu";
import GlobalSearch from "../components/common/GlobalSearch";
import Header from "../components/common/Header";
import SearchModal from "../components/common/modal/SearchModal";
import HouseListSwiper from "../components/HouseListSwiper";
import MainSwiper from "../components/MainSwiper";
import MainMap from "../components/common/map/MainMap";
import { NotificationAlert } from "../components/common/NotificationAlert";
import { getMyMain, getPopularMain, getShareMain } from "../lib/apis/main";
import axios from "axios";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [popularList, setPopularList] = useState([]);
  const [shareList, setShareList] = useState([]);
  const [myRoomList, setMyRoomList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    async function reactive() {
      getPopularMain(cancelToken)
        .then((res) => setPopularList(res.data.result))
        .catch((res) => console.log(res));
      getMyMain(cancelToken)
        .then((res) => setMyRoomList(res.data.result))
        .catch((res) => console.log(res));
      // 풀어줘
      // getShareMain((res) => setShareList(res.data.result)).catch((res) =>
      //   console.log(res)
      // );
    }
    reactive();
  }, []);
  return (
    <>
      <Header title="NANUM" />
      <MainSwiper />
      <GlobalSearch handleOpen={handleOpen} />
      <SearchModal open={open} handleClose={handleClose} />
      <HouseListSwiper title="신상 하우스" roomList={popularList} />

      {/* <HouseListSwiper title="추천 하우스" roomList={shareList} /> */}
      <HouseListSwiper title="원룸룸" roomList={myRoomList} />
      <MainMap />
      <Footer />
      <NotificationAlert />
      <BottomMenu />
    </>
  );
}
