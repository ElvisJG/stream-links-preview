import React from "react";

const LatestPane = ({ metaData }) => {
  const { data } = metaData;
  return (
    <div className="latest">
      <a href={data?.ogUrl} target="_blank" rel="noopener noreferrer">
        <img className="latest-image" src={data?.ogImage?.url} />
      </a>
      <h1 className="latest-title">{data?.ogTitle}</h1>
    </div>
  );
};

export default LatestPane;
