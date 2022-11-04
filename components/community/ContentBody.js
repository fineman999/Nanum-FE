import React from "react";

import styles from "../../styles/ContentBody.module.css";

const ContentBody = ({ title, content }) => {
  return (
    <div className={styles.content_body}>
      <div className={styles.title_wrapper}>
        <h3>{title}</h3>
      </div>
      <div className={styles.content_wrapper}>
        <p className={styles.overlay}>{content}</p>
      </div>
    </div>
  );
};

export default ContentBody;
