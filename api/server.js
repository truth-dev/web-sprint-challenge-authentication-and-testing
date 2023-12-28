const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const { restrict }= require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
 name: 'Chocolate Chip',
 secret: 'alohamora',
 cookie:{
    maxAge: 1000 * 60 * 60,
    secure: false, // only set cookies over https. Server will not send back a cookie over http.
 }, // 1 day in milliseconds 
    httpOnly: true,
    resave:false, //forces the session to be saved back to the session store
    saveUninitialized: false,  
}))

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict , jokesRouter); // only logged-in users should have access!

module.exports = server;
