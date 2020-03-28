import React from "react";

const LatestPane = ({ data }) => {
  return (
    <div className="latest" key={data.ogUrl}>
      <a href={data.ogUrl} target="_blank" rel="noopener noreferrer">
        <img className="latest-image" src={data.ogImage.url} />
      </a>
      <div className="latest-info">
        <h1 className="latest-title">{data.ogTitle}</h1>
      </div>
    </div>
  );
};

export default LatestPane;
