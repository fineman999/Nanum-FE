import React from "react";
import HostNavListItem from "./HostNavListItem";

const navList = [
  { id: 1, name: "입주신청현황", pathname: "/host/moves" },
  { id: 2, name: "투어신청현황", pathname: "/host/tours" },
];

const HostNavList = () => {
  return (
    <div className="nav_list_wrapper">
      <ul className="nav_list">
        {navList &&
          navList.map((listItem) => (
            <HostNavListItem key={listItem.id} listItem={listItem} />
          ))}
      </ul>
    </div>
  );
};

export default HostNavList;
