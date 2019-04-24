const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      username,
      password, 
      profilePhotoUrl
    } = req.body;

    User
      .create({ username, password, profilePhotoUrl })
      .then(user => {
        const token = user.authToken();
        res.send({ user, token });
      })
      .catch(next);
  });
