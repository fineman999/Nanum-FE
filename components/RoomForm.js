import React from "react";

import styles from "../styles/RoomForm.module.css";

const RoomForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return <form className={styles.room_add_form} onSubmit={handleSubmit}></form>;
};

export default RoomForm;
