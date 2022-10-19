import { Button, Divider, Toolbar } from "@mui/material";
import React from "react";

import styles from "../styles/HouseDetailTopMenu.module.css";

const HouseDetailTopMenu = () => {
  const MoveToAnchor = (event, target) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      target
    );
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.house_top_menu}>
      <Toolbar />
      <ul className={styles.top_menu_list}>
        <li>
          <Button
            onClick={(event) => MoveToAnchor(event, "#house_intro")}
            sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
          >
            소개
          </Button>
        </li>
        <li>
          <Button
            onClick={(event) => MoveToAnchor(event, "#house_room")}
            sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
          >
            방정보
          </Button>
        </li>
        <li>
          <Button
            onClick={(event) => MoveToAnchor(event, "#house_detail")}
            sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
          >
            주변정보
          </Button>
        </li>
        <li>
          <Button
            onClick={(event) => MoveToAnchor(event, "#house_review")}
            sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
          >
            리뷰(100)
          </Button>
        </li>
      </ul>
      <Divider />
    </div>
  );
};

export default HouseDetailTopMenu;
