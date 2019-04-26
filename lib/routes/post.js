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
  .get('/', (req, res, next) => {
    try {
      Post
        .find()
        .then(list => res.send(list));
    } catch(error) {
      next(error);
    }
  })
  .get('/:id', (req, res, next) => {
    Promise.all([
      Comment
        .find({ 'post': req.params.id })
        .populate('commentBy', {
          username: true
        })
        .populate('comment'),
      Post
        .findOne(req._id)
    ])
      .then(([found, post]) => {
        post.comments = found;
        res.send(post);
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
  });
