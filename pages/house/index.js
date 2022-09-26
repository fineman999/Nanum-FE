import { Hidden, IconButton } from "@mui/material";
import BottomMenu from "../../components/common/BottomMenu";
import Header from "../../components/common/Header";
import Map from "../../components/common/Map";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import HouseListItem from "../../components/HouseListItem";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    title: "night",
  },
];

export default function Houses() {
  return (
    <>
      <Header title="하우스 검색" type="search" />
      <div className="search_container">
        <div className="map_wrapper">
          <Map />
        </div>
        <div className="search_wrapper">
          <div className="search_inp_wrapper">
            <input
              className="search_input"
              type="search"
              name="searchInput"
              placeholder="지역명, 대학명, 지하철역으로 검색..."
            />

            <div className="icon_search">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <div className="icon_tune">
            <IconButton>
              <TuneIcon />
            </IconButton>
          </div>
        </div>
        <div className="house_list_wrapper">
          <ul className="house_list">
            {itemData &&
              itemData.map((item, index) => (
                <li className="house_list_item" key={index}>
                  <HouseListItem item={item} />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <BottomMenu />
      <style jsx>{`
        .search_container {
          display: flex;
          flex-direction: column;
        }

        .map_wrapper {
          width: 100%;
        }

        .house_list_wrapper {
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
          position: relative;
          width: 85%;
        }

        .search_input {
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
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

        .icon_tune {
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
        }
      `}</style>
    </>
  );
}
