import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import Preview from "./components/Preview";
import ConnectedTo from "./components/ConnectedTo";

const App = () => {
  const [stream, setStream] = useState([]);
  const [meta, setMeta] = useState([]);
  const [latest, setLatest] = useState([]);
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = values => {
    if (stream.length > 2) return;
    setStream(s => s.concat(values.channel));
    if (values.channel !== undefined) {
      io("http://localhost:4321").emit("channel", values.channel);
    }
    reset("");
  };

  const handleMetaData = md => setLatest(prev => prev.concat(md));
  useEffect(() => {
    io("http://localhost:4321").on("message", metaData => {
      handleMetaData(metaData);
    });
  }, []);

  useEffect(() => {
    if (latest.length > 1) {
      setMeta(prev => prev.concat(latest.shift()));
    }
    console.log("latest after logic", latest);
  }, [latest]);

  useEffect(() => {
    if (meta.length > 7) {
      setMeta(prev => prev.shift());
    }
    console.log("meta after logic", meta);
  }, [meta]);

  return (
    <div className="app">
      <div className="search">
        <h1>Twitch Links</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input name="channel" ref={register} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {stream.length >= 1 && <ConnectedTo stream={stream} />}
      <Preview meta={meta} stream={stream} latest={latest} />
    </div>
  );
};
export default App;