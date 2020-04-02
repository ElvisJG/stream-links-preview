import React from "react";
import Pane from "./Pane";

const PaneGroup = ({ metaData }) => {
  return (
    <div className="pane-group">
      {metaData.map(meta => {
        const { data } = meta;
        console.log("meta inside pane-group", data, meta);
        return <Pane meta={data} key={data.ogUrl} />;
      })}
    </div>
  );
};

export default PaneGroup;
