const { Router } = require('express');
const User = require('../../lib/models/User');

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
  });


