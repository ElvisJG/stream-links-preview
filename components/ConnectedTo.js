import React from "react";

const ConnectedTo = ({ stream }) => {
  return (
    <>
      {stream.length !== 0 && (
        <h3>
          Connected to{" "}
          {stream.map(s => (
            <>
              <span key={s}>{s}</span>
              {"! "}
            </>
          ))}
        </h3>
      )}
    </>
  );
};

export default ConnectedTo;
