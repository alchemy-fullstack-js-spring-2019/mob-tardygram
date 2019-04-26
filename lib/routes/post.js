const { Router } = require('express');
const Post = require('../../lib/models/Post');
const { ensureAuth } = require('../middleware/ensureAuth');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      user, photoUrl, caption, tags,
    } = req.body;
    Post 
      .create({ user, photoUrl, caption, tags })
      .then(gram => res.send(gram))
      .catch(next);
  })
  .get('/popular', (req, res, next) => {
    Post
      .getPopularPosts()
      .then(posts => res.send(posts))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Promise.all([

      Comment
        .find({ post: req.params.id })
        .select({ comment: true, commentBy: true })
      ,
      Post
        .findById(req.params.id)
    ])
      .then(([comments, post]) => {
        res.send({ post, comments });
      })
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndUpdate(req.params.id, req.body.caption, {
        new: true 
      })
      .select({
        __v: false
      })
      .then(updatedPosts => res.send(updatedPosts))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndDelete(req.params.id)
      .then(deletedPost => res.send(deletedPost))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    try {
      Post
        .find()
        .then(list => res.send(list));
    } catch(error) {
      next(error);
    }
  });
