require("dotenv").config();
const tmi = require("tmi.js");
const BST = require("./BinarySearchTree");
const og = require("open-graph");
const app = require("express")();

const search = BST("");

const pipe = (fn, ...fns) => (...args) =>
  fns.reduce((prev, nextFn) => nextFn(prev), fn(...args));

const trace = fn => args => {
  fn(args);
  return args;
};

const getMeta = command => {
  og(command, (err, meta) => {
    if (!err && meta !== undefined) {
      console.log("Meta Data", meta);
    }
  });
};

const handleMeta = pipe(trace(search.insert), getMeta);

const client = new tmi.client({
  options: { debug: true },
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  channels: [process.env.STREAM]
});

client.connect();
client.on("message", (channel, tags, message, self) => {
  const commandName = message.match(
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
  );
  if (commandName) {
    commandName
      .filter(command => !search.contains(command))
      .forEach(handleMeta);
  }
});

client.on("connect", (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});
