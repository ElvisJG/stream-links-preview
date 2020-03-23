require("dotenv").config();
const tmi = require("tmi.js");
const og = require("open-graph");
const io = require("socket.io")();
const { pipe, trace, urlRegex, BinarySearchTree } = require("./helpers");

const search = BinarySearchTree("");

const getMeta = command => {
  og(command, (err, meta) => {
    if (!err && meta !== undefined) {
      console.log("Meta Data", meta);
    }
  });
};

const handleMeta = pipe(trace(search.insert), getMeta);

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  channels: [process.env.STREAM]
});

client.connect();
client.on("message", (channel, tags, message, self) => {
  const commandName = message.match(urlRegex);
  // io.emit("message", channel, tags, message, self);
  if (commandName) {
    io.emit(
      "message",
      commandName
        .filter(command => !search.contains(command))
        .forEach(handleMeta)
    );
  }
});
