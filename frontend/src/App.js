import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import Preview from "./components/Preview";
import ConnectedTo from "./components/ConnectedTo";

const App = () => {
  const [stream, setStream] = useState("");
  const [latest, setLatest] = useState();
  const [meta, setMeta] = useState([]);
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = values => {
    setStream(values.channel);
    if (values.channel !== undefined) {
      io("http://localhost:4321").emit("channel", values.channel);
    }
  };

  const handleMetaData = md => {
    console.log("md wyd", md);
    setLatest(prevLatest => {
      setMeta(prevMeta => {
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
    io("http://localhost:4321").on("message", metaData => {
      console.log(metaData);
      handleMetaData(metaData);
    });
  }, []);

  return (
    <div className="app">
      <div className="search">
        <h1>Twitch Links</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input name="channel" ref={register} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {stream && <ConnectedTo stream={stream} />}
      <Preview meta={meta} stream={stream} latest={latest} />
    </div>
  );
};
export default App;
