import Link from "next/link";
import React from "react";

import styles from "../styles/HouseNearPlaceListItem.module.css";

const HouseNearPlaceListItem = ({ place }) => {
  return (
    <Link href={place.place_url}>
      <li className={styles.place_list_item}>
        <div className={styles.place_info_wrapper}>
          <div className={styles.category_wrapper}>
            {/* <div className="category_group_code">
              {place.category_group_code}
            </div> */}
            <div className={styles.category_group_name}>
              {place.category_group_name}
            </div>
            <div className={styles.category_name}>{place.category_name}</div>
          </div>
          <div className={styles.place_info_header}>
            <div className={styles.place_name}>{place.place_name}</div>
            <div className={styles.phone}>Tel. {place.phone}</div>
          </div>
          <div className={styles.place_info_body}>
            <div className="address_name">{place.address_name}</div>
            <div className="road_address_name">{place.road_address_name}</div>
          </div>
          {/* <div className="place_url">{place.place_url}</div> */}
        </div>
      </li>
    </Link>
  );
};

export default HouseNearPlaceListItem;
