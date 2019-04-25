const { Router } = require('express');
const Post = require('../../lib/models/Post');

module.exports = Router()
  .post('/', (req, res, next) => {
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
    try {
      Post
        .findOne(req._id)
        .then(found => res.send(found));
    } catch(error) {
      next(error);
    }
  })
  .patch('/:id', (req, res, next) => {
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
  .delete('/:id', (req, res, next) => {
    Post
      .findByIdAndDelete(req.params.id)
      .then(deletedPost => res.send(deletedPost))
      .catch(next);
  });
