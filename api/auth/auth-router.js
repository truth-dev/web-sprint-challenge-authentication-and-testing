const router = require("express").Router();
const Users = require("../users/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("../../config/index");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password required",
      });
    }
    const user = await Users.findBy({ username }).first();
    if (user) {
      return res.status(409).json({
        message: "username taken",
      });
    }
    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, BCRYPT_ROUNDS),
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password required",
      });
    }

    const user = await Users.findBy({ username: username }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = buildToken(user);
    res.status(200).json({
      message: `Welcome ${user.username}!`,
      token,
    });
  } catch (err) {
    next(err);
  }
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
