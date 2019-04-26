const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/popular', async(req, res, next) => {
    try {
      const topTen = await User.popular();
      res.send(topTen);
    } catch(error) {
      next(error);
    }
  });
