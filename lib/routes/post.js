const { Router } = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
// took out ensureAuth,
  .post('/posts', (req, res, next) => {
    const user = req.body.user;
    const photoUrl = req.body.photoUrl;
    const caption = req.body.caption;
    const tags = req.body.tags;

    Post
      .create({ user, photoUrl, caption, tags })
      .then(createdPost => {
        console.log(createdPost);
        res.send(createdPost);
      })
      .catch(next);
  });

