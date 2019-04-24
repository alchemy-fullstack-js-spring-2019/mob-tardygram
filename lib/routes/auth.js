const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User
      .create({u})
      //create
      //then res.send
      //catch
  })
  
  // post for sign in

  // get verify
;
