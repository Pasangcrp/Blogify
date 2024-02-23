const express = require("express");

const app = express();
const userRouter = require(`./controllers/users`);
const blogRouter = require("./controllers/blogs");
const logger = require(`./utils/logger`);
const config = require(`./utils/config`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
} = require(`./utils/middleware`);
const cors = require("cors");

mongoose
  .connect(config.MONGO_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(() => logger.error("Error connecting to MongoDB"));

app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.get(`/`, (req, res) => {
  res.end("Welcome");
});

app.use(bodyParser.json());

app.use("/api/users", userRouter);

app.use(tokenExtractor);
app.use("/api/blogs", blogRouter);

app.use(unknownEndpoint);
module.exports = app;
