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

const client = new tmi.Client({
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  // channels: [process.env.STREAM]
  channels: ["picashii"]
});

client.connect();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  const search = BinarySearchTree("");

  client.on("message", (channel, tags, message, self) => {
    if (self) return;
    const commandName = message.match(urlRegex);
    if (commandName) {
      handleEmit(commandName, socket, search);
    }
  });
});

module.exports = server;
