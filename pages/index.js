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

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

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
        .then((res) => {
          console.log(res);
          setPopularList(res.data.result);
        })
        .catch((res) => console.log(res));

      getMyMain(cancelToken)
        .then((res) => {
          console.log(res);
          setMyRoomList(res.data.result);
        })
        .catch((res) => console.log(res));

      axios.get(BASE_URL + "/houses/main/sharelist").then((res) => {
        const { status } = res;
        const { isSuccess, message, result } = res.data;
        if (status === 200 && isSuccess) {
          setShareList(result);
        }
      });
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
      <HouseListSwiper title="추천 하우스" roomList={shareList} />
      <HouseListSwiper title="마이룸(원룸형)" roomList={myRoomList} />
      <MainMap />
      <Footer />
      <NotificationAlert />
      <BottomMenu />
    </>
  );
}
