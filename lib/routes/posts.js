const Post = require('../models/Post');
const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()

  .post('/', ensureAuth, (req, res, next) => {
    const {
      user,
      photoUrl,
      caption,
      tags
    } = req.body;

    Post
      .create({
        user,
        photoUrl,
        caption,
        tags
      })
      .then(post => {
        res.send(post);
      })
      .catch(next);
  });
