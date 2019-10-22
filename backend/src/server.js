const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const moment = require("moment");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;  

  socket.on("disconnect", () => {
    delete connectedUsers[user];    
  });
});

mongoose.connect("mongodb://localhost:27017/wpp", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers

  return next()
})

app.use(express.json());

app.use(cors());

moment.locale("pt-br");

app.use(routes);

server.listen(3333);
