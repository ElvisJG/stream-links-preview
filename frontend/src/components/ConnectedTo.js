import React from "react";

const ConnectedTo = ({ stream }) => {
  return (
    <div className="connected-to">
      {stream.length !== 0 && (
        <h3>
          Connected to{" "}
          {stream.map(s => (
            <span key={s}>{`${s}! `}</span>
          ))}
        </h3>
      )}
    </div>
  );
};

export default ConnectedTo;
