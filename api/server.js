const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const restrict = require("./middleware/restricted.js");

const authRouter = require("./auth/auth-router.js");
const jokesRouter = require("./jokes/jokes-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", restrict, jokesRouter); // only logged-in users should have access!

server.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message: "Something went wrong, please try again later",
    })
    .catch(next);
});

module.exports = server;
