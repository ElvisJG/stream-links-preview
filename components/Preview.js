import React from "react";
import ConnectedTo from "./ConnectedTo";
import LatestPane from "./LatestPane";
import Pane from "./Pane";

const Preview = ({ m, s, l }) => {
  return (
    <div className="pane-container">
      <ConnectedTo stream={["Test Stream"]} />
      <div className="preview_pane">
        {/* <LatestPane data={l} /> */}
        <Pane data={m} />
      </div>
    </div>
  );
};

export default Preview;
