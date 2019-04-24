const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      photoUrl,
      caption
    } = req.body;
    
    Post
      .create({ user: req.body.user, photoUrl, caption })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Post
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(posts => res.send(posts))
      .catch(next);
  });
