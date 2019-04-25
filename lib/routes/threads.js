const { Router } = require('express');
const Thread = require('../models/Thread');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      username,
      photoUrl,
      caption,
      hashtag
    } = req.body;

    Thread
      .create({ username, photoUrl, caption, hashtag })
      .then(thread => {
        res.send(thread);
      })
      .catch(next);
  })