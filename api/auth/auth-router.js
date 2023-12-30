const router = require('express').Router();
const Users = require('../users/user-model')  ;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkUsernameFree } = require('../middleware/restricted');

const { BCRYPT_ROUNDS, JWT_SECRET } = require('../../config/index');



router.post('/register', checkUsernameFree, async (req, res, next) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  user.password = hash; 
  if(!user.username || !user.password){
    res.status(401).json({message: 'username and password required'})
  }else{
    Users.add(user)
  .then(saved => {
    res.status(201).json({message: `Welcome ${saved.username} to the dad joke app!`})
  
  })
 
  }
  try {
    const exists = await Users.findBy({username: user.username})
    if(exists.length){
      res.status(401).json({message: 'username taken'})
  }
} catch (err) { 
  next(err)
}


});

router.post('/login', (req, res, next) => {
 const {username, password} = req.body;

 if(!username || !password){
   res.status(401).json({message: 'username and password required'})
 }

 Users.findBy(username)
 .then(([user]) => {
  if (user && bcrypt.compareSync(password, user.password)){
   const token = buildToken(user)
   res.status(200).json({message: `Welcome back, ${user.username}`, token})

  }else{
    next({status: 401, message: 'invalid credentials'})
  }
  
 })
 .catch(next)


});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options) 
}

module.exports = router;
