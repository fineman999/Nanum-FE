import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import myMoveFilterStateListState from "../../state/atom/myMoveFilterStateListState";

import styles from "../../styles/MyMoveListFilter.module.css";
import classNames from "classnames/bind";
import myMoveFilterState from "../../state/atom/myMoveFilterState";
const cx = classNames.bind(styles);

const MyMoveListFilter = () => {
  const [filterStateList, setFilterStateList] = useRecoilState(
    myMoveFilterStateListState
  );
  const setMyMoveFilterState = useSetRecoilState(myMoveFilterState);

  const handleClick = (e, id) => {
    const nextFilterStateList = filterStateList.map((listItem) => {
      if (listItem.id === id) {
        return { ...listItem, active: true };
      } else if (listItem.active) {
        return { ...listItem, active: false };
      } else {
        return listItem;
      }
    });

    const filterState = e.target.childNodes[0].nodeValue;

    switch (filterState) {
      case "대기":
        setMyMoveFilterState("WAITING");
        break;
      case "거부":
        setMyMoveFilterState("REJECTED");
        break;
      case "취소":
        setMyMoveFilterState("CANCELED");
        break;
      case "계약중":
        setMyMoveFilterState("CONTRACTING");
        break;
      case "계약완료":
        setMyMoveFilterState("CONTRACT_COMPLETED");
        break;
      default:
        setMyMoveFilterState("ALL");
    }
    setFilterStateList(nextFilterStateList);
  };

  return (
    <ul className={styles.filter_list}>
      {filterStateList &&
        filterStateList.map((listItem) => (
          <li
            key={listItem.id}
            className={cx("filter_list_item", `${listItem.active && "active"}`)}
            onClick={(event) => handleClick(event, listItem.id)}
          >
            {listItem.name}
          </li>
        ))}
    </ul>
  );
};

export default MyMoveListFilter;
