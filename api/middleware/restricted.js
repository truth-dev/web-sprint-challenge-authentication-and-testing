const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

 if(token){
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err){
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })

 }else{
   res.status(400).json({ message: "No credentials provided" });
 }
};
