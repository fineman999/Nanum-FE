import Link from "next/link";
import React from "react";

const HostNavListItem = ({ listItem }) => {
  return (
    <li className="nav_list_item">
      <Link href={`${listItem.pathname}`}>{listItem.name}</Link>
    </li>
  );
};

export default HostNavListItem;
