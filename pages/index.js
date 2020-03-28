import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import Preview from "../components/Preview";
import ConnectedTo from "../components/ConnectedTo";
import mockdata from "./mockdata.json";

const HomePage = () => {
  const [stream, setStream] = useState([]);
  const [meta, setMeta] = useState([]);
  const [latest, setLatest] = useState({});
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = values => {
    event.preventDefault();
    if (stream.length > 2) return;
    setStream(s => s.concat(values.channel));
    if (values.channel !== undefined) {
      io("http://localhost:4321").emit("channel", values.channel);
    }
    reset("");
  };

  // const handleMetaData = meta => setMeta(m => m.concat(meta));
  // useEffect(() => {
  //   io("http://localhost:4321").on("message", e => handleMetaData(e));
  // }, []);

  useEffect(() => {
    const latest = mockdata[0].pop();
    latest.length >= 1 && setMeta(m => m.push(latest.pop()));
    setMeta(m => m.concat(mockdata[0]));
    setLatest(latest);
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
      {!stream.length >= 1 && <ConnectedTo stream={["Test Stream"]} />}
      <Preview meta={meta} stream={stream} latest={latest} />
    </div>
  );
};
export default HomePage;
