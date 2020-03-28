import React from "react";

const Preview = ({ meta }) => {
  return (
    <>
      {meta.map(m => {
        const { data } = m;
        return (
          <div className="pane" key={data.ogTitle}>
            <a href={data.ogUrl} target="_blank" rel="noopener noreferrer">
              <img className="pane-image" src={data.ogImage.url} />
            </a>
            <div className="pane-info">
              <h1 className="pane-title">{data.ogTitle}</h1>
              {meta.length <= 5 && (
                <div className="collapsable">
                  <h2>{data.ogType}</h2>
                  <h2 className="pane-description">{data.ogDescription}</h2>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Preview;
