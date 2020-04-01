import React from "react";

const LatestPane = ({ metaData }) => {
  return (
    <div className="latest">
      {metaData.map(meta => (
        <React.Fragment key={meta.data.ogUrl}>
          <a href={meta.data.ogUrl} target="_blank" rel="noopener noreferrer">
            <img
              className="latest-image"
              src={meta.data.ogImage.url}
              alt={meta.data.ogTitle}
            />
          </a>
          <h1 className="latest-title">{meta.data.ogTitle}</h1>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LatestPane;
