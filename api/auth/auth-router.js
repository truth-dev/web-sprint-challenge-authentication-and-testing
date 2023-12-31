const router = require("express").Router();
const Users = require("../users/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("../../config/index");

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Please provide a username and password",
    });
  }
  try {
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

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user);
        res
          .status(200)
          .json({ message: `Welcome back ${user.username}...`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(next);
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
