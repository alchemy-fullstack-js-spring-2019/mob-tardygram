const Post = require('../models/Post');
const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const { untokenize } = require('../utils/token');

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
    Post
      .findById(req.params.id)
      .populate('user', { _id: true, username: true, profilePhotoUrl: true })
      .lean()
      .select({
        __v: false
      })
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    const {
      caption
    } = req.body;

    const uId = untokenize(req.token)._id;

    Post
      .findById(req.params.id)
      .then(post => {
        if(post.user.toString() === uId) {
          Post
            .findByIdAndUpdate(req.params.id, { caption }, { new: true })
            .lean()
            .select({
              __v: false
            })
            .then(post => res.send(post));
        }
        else {
          const error = new Error('You shall not update this post.');
          error.status = 401;
          return next(error);
        }
      })
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    const uId = untokenize(req.token)._id;

    Post
      .findById(req.params.id)
      .then(post => {
        if(post.user.toString() === uId) {
          Post
            .findByIdAndDelete(req.params.id)
            .lean()
            .select({
              __v: false
            })
            .then(post => res.send(post));
        }
        else {
          const error = new Error('You shall not delete this post.');
          error.status = 401;
          return next(error);
        }
      })
      .catch(next);
  });

