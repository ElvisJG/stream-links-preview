const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const tmi = require("tmi.js");
const socketIO = require("socket.io");
const { urlRegex, handleEmit, BinarySearchTree } = require("./helpers");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
const server = http.createServer(app);
const io = socketIO(server);

const client = new tmi.Client();

io.on("connection", (socket) => {
  socket.on("channel", (channelName) => {
    client.connect().then(() => {
      client.join(channelName);
    });
  });
});

const search = BinarySearchTree("");
client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (tags["display-name"] === "Fossabot") return;
  const commandName = message.match(urlRegex);
  if (commandName) {
    handleEmit(commandName, io, search);
  }
});

module.exports = server;
