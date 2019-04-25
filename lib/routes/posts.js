const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

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
  })

  .get('/:id', (req, res, next) => {
    return Promise.all([
      Post
        .findById(req.params.id)
        .select({
          __v: false
        })
        .lean(),
      Comment
        .find({ post: req.params.id })
        .select({
          commentBy: true,
          comment: true
        })
        .lean()
    ])
      .then(([post, comments]) => {
        res.send({ ...post, comments });
      })
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndUpdate(req.params.id, { caption: req.body.caption }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(post => res.send(post))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedPost => res.send(deletedPost))
      .catch(next);
  });
