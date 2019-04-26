const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
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
          next(error);
        } else {
          res.send({ token: user.authToken(), user });
        }
      });
  })

  .get('/prolific', (req, res, next) => {
    User  
      .topUsers()
      .then(topUsers => res.send(topUsers))
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
    next();
  });
