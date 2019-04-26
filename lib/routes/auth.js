const { Router } = require('express');
const User = require('../../lib/models/User');
const { ensureAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/signup', async(req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.create({
        username,
        password
      });
      const token = user.authToken();
      res.send({ user, token });
    } catch(error){
      next(error);
    }
  })

  .post('/signin', async(req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if(!user) {
        const error = new Error('Invalid authentication');
        error.status = 401;
        next(error);
      } 
      const result = await user.compare(password);
      if(!result) {
        const error = new Error('Invalid authentication');
        error.status = 401;
        next(error);
      } 
      const token = user.authToken();
      res.send({ user, token });
    } catch(error) {
      next(error);
    }
  })

  //eslint-disable-next-line no-unused-vars
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  });


