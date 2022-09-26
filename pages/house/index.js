import BottomMenu from "../../components/common/BottomMenu";
import Header from "../../components/common/Header";
import Map from "../../components/common/Map";

export default function Houses() {
  return (
    <>
      <Header title="하우스 검색" type="search" />
      <div className="search-container">
        <div className="map-wrapper">
          <Map />
        </div>
        <div className="house-list-wrapper"></div>
      </div>
      <BottomMenu />
      <style jsx>{``}</style>
    </>
  );
}
