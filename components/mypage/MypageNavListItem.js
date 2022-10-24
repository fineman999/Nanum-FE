import Link from "next/link";
import React from "react";

import styles from "../../styles/MypageNavListItem.module.css";

const MypageNavListItem = ({ listItem }) => {
  return (
    <li className={styles.nav_list_item}>
      <Link href={`${listItem.pathname}`}>
        <a>
          <div className="list_info">{listItem.name}</div>
          <div className="list_image"></div>
        </a>
      </Link>
    </li>
  );
};

export default MypageNavListItem;
