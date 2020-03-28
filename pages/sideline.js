{
  bgText ? <h1 className="bg-text">{bgText}</h1> : null;
}
const bgText = watch("channel");
// const storage = RingBuffer(2);
// const storage = [];

{
  /* {storage.map(meta => {
        <>
          {console.log("meta?!", meta)}
          <h2>{meta.type}</h2>
          <h2>{meta.url}</h2>
          <h2>{meta.title}</h2>
          <img src={meta.image.url} />
        </>;
      })} */
}

const og = require("open-graph");

// og(command, (err, meta) => {
// if (!err && meta !== undefined) {
// socket.emit("message", { ...meta, url: command });
// }
// });

const handleEmit = (urls, io, bst) => {
  urls
    .filter(url => !bst.contains(url))
    .forEach(command => {
      bst.insert(command);
      ogs({ url: command })
        .then(result => io.emit("message", { ...result, url: command }))
        .catch(error => console.log("error", error));
    });
};

client.connect().then(() => {
  client.join(channel);
});
// channels: [process.env.STREAM]
