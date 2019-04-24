const { Router } = require('express');
const { tokenize } = require('../../lib/utils/token');
const User = require('../../lib/models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      username,
      password
    } = req.body;
    User.create({ username, password })
      .then(user => {
        const token = tokenize(user);
        res.send({ user, token });
      })
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const {
      username,
      password
    } = req.body;
    User.findOne({ username })
      .then(user => {
        if(!user) {
          const error = new Error('no such email+pass');
          error.status = 401;
          return next(error);
        } else {
          return user.compare(password)
            .then(result => {
              if(result) {
                const token = user.authToken();
                res.send({ user, token });
              } else { 
                const error = new Error('no such email+pass');
                error.status = 401;
                next(error);
              }
            });
        }
      });
  });
