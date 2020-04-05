import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import Preview from "./components/Preview";
import ConnectedTo from "./components/ConnectedTo";
const socket = io("http://localhost:4321");

const App = () => {
  const [stream, setStream] = useState("");
  const [latest, setLatest] = useState();
  const [meta, setMeta] = useState([]);
  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    setStream(values.channel);
    if (values.channel !== undefined) {
      io("http://localhost:4321").emit("channel", values.channel);
    }
  };

  const handleMetaData = (md) => {
    setLatest((prevLatest) => {
      setMeta((prevMeta) => {
        if (prevLatest) {
          if (prevMeta.length === 6) {
            prevMeta.shift();
          }
          return prevMeta.concat(prevLatest);
        } else {
          return prevMeta;
        }
      });
      return md;
    });
  };

  useEffect(() => {
    socket.on("message", (metaData) => handleMetaData(metaData));
    return () => socket.disconnect();
  }, []);

  return (
    <div className="app">
      <div className="search">
        <h1>Twitch Links</h1>
        {!stream ? (
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input name="channel" ref={register} />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <ConnectedTo stream={stream} />
        )}
      </div>
      <Preview meta={meta} stream={stream} latest={latest} />
    </div>
  );
};
export default App;
