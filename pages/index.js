import { useState } from "react";
import IO from "socket.io-client";
import { useForm } from "react-hook-form";
import { RingBuffer } from "../helpers/ring_buffer";

const HomePage = () => {
  const [stream, setStream] = useState("");
  const { handleSubmit, register, watch, errors } = useForm();
  const bgText = watch("channel");
  const storage = RingBuffer(2);
  const onSubmit = values => {
    event.preventDefault();
    setStream(values.channel);
    console.log(values);
    // send the backend the form info, set the stream listener to that value
    const socket = IO("http://localhost:4321");
    // start the socket
    socket.on("message", e => {
      storage.append(e);
      console.log(storage.get());
    });
  };
  return (
    <div className="page">
      <h1>Twitch Links</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input name="channel" ref={register} />
        <button type="submit">Submit</button>
      </form>
      {stream ? <h3>Connected to {stream}</h3> : null}
      {bgText ? <h1 className="bg-text">{bgText}</h1> : null}
      {IO.Socket.connected ? (
        <div>
          <p>Hello</p>
        </div>
      ) : null}
    </div>
  );
};
export default HomePage;
