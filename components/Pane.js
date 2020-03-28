import React from "react";

const Pane = ({ metaData }) => {
  return (
    <>
      {metaData.map(m => {
        const { data } = m;
        <div className="pane" key={data.ogUrl}>
          <a href={data.ogUrl} target="_blank" rel="noopener noreferrer">
            <img className="pane-image" src={data.ogImage.url} />
          </a>
          <div className="pane-info">
            <h1 className="pane-title">{data.ogTitle}</h1>
          </div>
        </div>;
      })}
    </>
  );
};

export default Pane;
