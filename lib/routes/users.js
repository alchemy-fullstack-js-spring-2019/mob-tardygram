const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/popular', async(req, res, next) => {
    try {
      const topPopular = await User.popular();
      res.send(topPopular);
    } catch(error) {
      next(error);
    }
  })

  .get('/prolific', async(req, res, next) => {
    try {
      const topProlific = await User.prolific();
      res.send(topProlific);
    } catch(error) {
      next(error);
    }
  })

  .get('/leader', async(req, res, next) => {
    try {
      const topLeader = await User.leader();
      res.send(topLeader);
    } catch(error) {
      next(error);
    }
  })

  .get('/impact', async(req, res, next) => {
    try {
      const topImpact = await User.impact();
      res.send(topImpact);
    } catch(error) {
      next(error);
    }
  });
