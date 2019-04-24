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
        res.send({ user, token: user.authToken() });
      })
      .catch(next);
  })
  
  .post('/signin', (req, res, next) => {
    const {
      username,
      password
    } = req.body;

    User
      .findOne({ username })
      .then(user => {
        if(!user) {
          const error = new Error('Invalid authentication');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, result]) => {
        if(!result) {
          const error = new Error('Invalid authentication');
          error.status = 401;
          return next(error);
        } else {
          res.send({ user, token: user.authToken() });
        }
      })
      .catch(next);
  });
