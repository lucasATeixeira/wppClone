const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const moment = require("moment");

const app = express();

mongoose.connect("mongodb://localhost:27017/wpp", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(express.json());

app.use(cors());

moment.locale("pt-br");

app.use(routes);

app.listen(3333);
