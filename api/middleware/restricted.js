const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config/index')



 const restrict = (req, res, next) => {
  const token = req.headers.authorization 
  if(token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        next({status: 401, message: 'token invalid, you shall not pass'})
      }else{
        req.decodedJwt = decoded
        console.log(req.decodedJwt)
      }
    })
  }else{
      next({status: 401, message: 'what? no token? absurd!'})
    }
  
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};

async function checkUsernameFree(req, res, next) {
  if(req.body.username){
    next();

  }else{
    next({status: 422, message: 'Your chosen username is already taken, please choose another.'})
  }
} 
const checkRole = role => (req, res, next) => {
  if(req.decodedJwt && req.decodedJwt.role === role) {
    next()
    console.log('you must be the master of this domain, you may pass!')
  }else{
    next({status:403, message: 'your level has no authority here, peasant!'})
  }
}
module.exports = {
  restrict,
  checkUsernameFree,
  checkRole
};