import React from "react";

const MarkerContent = ({ markerItem }) => {
  const { houseName } = markerItem;
  return (
    <div className="marker_content_wrapper">
      <h3>{houseName}</h3>
    </div>
  );
};

export default MarkerContent;
