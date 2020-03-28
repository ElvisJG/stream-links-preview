import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import Preview from "../components/Preview";
import data from "./mockdata.json";

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
    setMeta(m => m.concat(data[0]));
    console.log("meta", meta);
    // setLatest();
    // console.log("slice", meta.slice(0, -1));
  }, []);

  return (
    <div className="page">
      <div className="search">
        <h1>Twitch Links</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input name="channel" ref={register} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {meta && stream && <Preview m={meta} s={stream} l={latest} />}
    </div>
  );
};
export default HomePage;
