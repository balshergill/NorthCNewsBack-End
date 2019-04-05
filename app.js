const express = require("express");
const apiRouter = require("./routes/apiRouter");
const bodyParser = require("body-parser");
const {
  methodNotAllowed,
  handle400,
  handle404,
  handle422,
  handle500
} = require("./errors");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use(methodNotAllowed);
app.use(handle400);
app.use(handle404);
app.use(handle422);
app.use(handle500);

module.exports = app;
