const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected");

  socket.on("Incoming Data", data => {
    socket.broadcast.emit("outgoing data", { num: data });
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = server;
