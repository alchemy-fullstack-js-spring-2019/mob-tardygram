const { Router } = require('express');
const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      username,
      password,
      profilePhoto
    } = req.body;

    User
      .create({ username, password, profilePhoto })
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
          const error = new Error('Invalid Authentication');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ])
          .then(([user, result]) => {
            if(!result) {
              const error = new Error('Invalid Authentication');
              error.status = 401;
              next(error);
            } else {
              res.send({ token: user.authToken(), user });
            }
          });
      });
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  });
