const { Router } = require('express');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      photoUrl,
      caption,
      tags
    } = req.body;
    Post
      .create({ user: req.user._id, photoUrl, caption, tags})
      .then(post => res.send(post))
      .catch(next);
  });
