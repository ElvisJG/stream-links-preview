import React from "react";

const LatestPane = ({ metaData }) => {
  return (
    <div className="latest">
      <a href={metaData.ogUrl} target="_blank" rel="noopener noreferrer">
        <img className="latest-image" src={metaData.ogImage} />
      </a>
      <div className="latest-info">
        <h1 className="latest-title">{metaData.ogTitle}</h1>
      </div>
    </div>
  );
};

export default LatestPane;
