import { IconButton } from "@mui/material";
import BottomMenu from "../../components/common/BottomMenu";
import HouseMap from "../../components/common/map/HouseMap";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import HouseListItem from "../../components/HouseListItem";
import Footer from "../../components/common/Footer";
import SubHeader from "../../components/common/SubHeader";
import { useState } from "react";
import SearchModal from "../../components/common/modal/SearchModal";
import { useRouter } from "next/router";
import Link from "next/link";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    name: "Bed",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스],
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    name: "Books",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    name: "Sink",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    name: "Kitchen",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    name: "Blinds",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    name: "Chairs",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    name: "Laptop",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    name: "Doors",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    name: "Coffee",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    name: "Storage",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    name: "Candle",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    name: "Coffee table",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    name: "night",
    isLike: false,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
];

export default function Houses() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchForm, setSearchForm] = useState({
    searchInput: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchForm.searchInput);
    router.push({
      pathname: "/house",
      query: { search: searchForm.searchInput },
    });
  };

  return (
    <>
      <SubHeader title="하우스 검색" type="search" />
      <div className="search_container">
        {/* 지도 맵 API */}
        <div className="map_wrapper">
          <HouseMap />
        </div>
        <div className="house_list_wrapper">
          <div className="search_wrapper">
            <div className="search_inp_wrapper">
              <input
                className="search_input"
                name="searchInput"
                placeholder="지역명, 대학명, 지하철역으로 검색..."
                onChange={handleChange}
              />

              <div className="icon_search">
                <IconButton onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
            <div className="icon_tune">
              <IconButton onClick={handleOpen}>
                <TuneIcon />
              </IconButton>
            </div>
          </div>
          <div className="filter_wrapper">
            <ul className="filter_list">
              <li className="active">전체</li>
              <li>인기</li>
              <li>쉐어</li>
              <li>마이룸</li>
              <li>기타</li>
            </ul>
          </div>
          <ul className="house_list">
            {itemData &&
              itemData.map((item, index) => (
                <li className="house_list_item" key={index}>
                  <Link href="/house/1">
                    <a>
                      <HouseListItem item={item} />
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <SearchModal open={open} handleClose={handleClose} />
      <BottomMenu />
      <Footer />
      <style jsx>{`
        // mobile first
        .search_container {
          display: flex;
          flex-direction: column;
        }

        .map_wrapper {
          width: 100%;
          height: 400px;
        }

        .house_list_wrapper {
          position: relative;
          width: 100%;
        }

        .search_wrapper {
          box-sizing: border-box;
          width: 100%;
          display: flex;
          background: white;
          padding: 10px;
        }

        .search_inp_wrapper {
          box-sizing: border-box;
          position: relative;
          width: 90%;
          padding-left: 15px;
        }

        .search_input {
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
          padding-left: 15px;
          border-radius: 50px;
          border: none;
          font-size: 1rem;
          background: #f5f5f5;
        }

        .icon_search {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
        }

        .icon_tune {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .filter_wrapper {
          width: 100%;
          height: 30px;
          box-sizing: border-box;
          padding: 10px;
        }

        .filter_list {
          display: flex;
          align-items: center;
        }

        .filter_list > li {
          margin-right: 10px;
        }

        .filter_list > li.active {
          text-decoration: underline;
          box-sizing: border-box;
          font-weight: bold;
        }

        .house_list {
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .house_list_item {
          box-sizing: border-box;
          width: 48%;
          margin-bottom: 12px;
          font-size: 10px;
        }

        // media query
        @media all (min-width: 1024px) {
          .search_container {
            flex-direction: row-reverse;
          }

          .map_wrapper {
            height: 100vh;
          }

          .house_list_wrapper {
            box-sizing: border-box;
            width: 100%;
            height: 100vh;
            overflow: auto;
          }

          /* Hide scrollbar for Chrome, Safari and Opera */
          .house_list_wrapper::-webkit-scrollbar {
            display: none;
          }

          .house_list_item {
            box-sizing: border-box;
            width: 33%;
            margin-bottom: 12px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
