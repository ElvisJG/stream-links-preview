import React, { useState } from "react";
import ConnectedTo from "./ConnectedTo";
import LatestPane from "./LatestPane";
import Pane from "./Pane";

const Preview = ({ meta, stream, latest }) => {
  return (
    <div className="pane-container">
      <ConnectedTo stream={["Test Stream"]} />
      <div className="preview_pane">
        <LatestPane metaData={latest} />
        <Pane metaData={meta} />
      </div>
    </div>
  );
};

export default Preview;
