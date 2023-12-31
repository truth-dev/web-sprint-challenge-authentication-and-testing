const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, message: "token invalid, you shall not pass" });
      } else {
        req.decodedJwt = decoded;
        console.log(req.decodedJwt);
      }
    });
  } else {
    next({ status: 401, message: "what? no token? absurd!" });
  }
};
