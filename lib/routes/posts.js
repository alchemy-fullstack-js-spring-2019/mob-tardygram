const { Router } = require('express');
const Post = require('../models/Post');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      photoUrl,
      caption,
      tags
    } = req.body;
    Post
      .create({ user: req.user._id, photoUrl, caption, tags })
      .then(post => res.send(post))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Post 
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Post
      .findById(req.params.id)
      .populate('user', {
        _id: true,
        username: true, 
        profilePhotoUrl: true
      })
      .lean()
      .then(post => res.send(post))
      .catch(next);
  });
