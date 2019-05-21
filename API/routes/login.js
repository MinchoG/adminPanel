const express = require('express');
const loginRouter = express.Router();
const validateUser = require('./../helpers/validateUser');
const jwt = require('../helpers/jwt');

loginRouter.post('/', async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    //vallidation of password and username
    const user = await validateUser(username, password);
  
    if (user) {
      res.json({ token: jwt.sign({ id: user.id }), error: '' });
    } else {
      res.json({ error: 'Wrong username/password' });
    }
    console.log('User name = ' + username + ', password is ' + password);
  });

  module.exports = loginRouter;