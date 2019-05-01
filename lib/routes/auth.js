const { Router } = require('express');
const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureAuth');

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
      password,
      profilePhotoUrl
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
        ]);
      })
      .then(([user, result]) => {
        if(!result) {
          const error = new Error('Invalid Authentication');
          error.status = 401;
          next(error);
        } else {
          res.send({ token: user.authToken(), user });
        }
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user)
      .catch(next);
  })
