import { IconButton } from "@mui/material";
import BottomMenu from "../../components/common/BottomMenu";
import HouseMap from "../../components/common/map/HouseMap";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Footer from "../../components/common/Footer";
import SubHeader from "../../components/common/SubHeader";
import { useState } from "react";
import SearchModal from "../../components/common/modal/SearchModal";
import { useRouter } from "next/router";
import Head from "next/head";
import HouseSearchList from "../../components/HouseSearchList";

export default function Houses() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchForm, setSearchForm] = useState({
    searchWord: "",
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
    router.push({
      pathname: "/house",
      query: { search: searchForm.searchWord },
    });
  };

  return (
    <>
      <Head>
        <title>하우스 검색</title>
      </Head>
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
                name="searchWord"
                value={
                  searchForm.searchWord.length >= 20
                    ? `${searchForm.searchWord.slice(0, 20)}...`
                    : searchForm.searchWord
                }
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
          <HouseSearchList
            searchForm={searchForm}
            setSearchForm={setSearchForm}
          />
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

          .house_list_wrapper::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
