import React from "react";

const ConnectedTo = ({ stream }) => {
  return (
    <div className="connected-to">
      {stream && (
        <h3>
          Connected to <span>{stream}!</span>
        </h3>
      )}
    </div>
  );
};

export default ConnectedTo;
