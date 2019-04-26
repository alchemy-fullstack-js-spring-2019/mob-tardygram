const { Router } = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
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
  .get('/popular', (req, res, next) => {
    Comment
      .aggregate(
        [
          {
            '$group': {
              '_id': '$post',
              'count': {
                '$sum': 1
              }
            }
          }, {
            '$sort': {
              'count': -1
            }
          }, {
            '$limit': 10
          }, {
            '$lookup': {
              'from': 'posts',
              'localField': '_id',
              'foreignField': '_id',
              'as': '_id'
            }
          }, {
            '$unwind': '$_id'
          }, {
            '$lookup': {
              'from': 'users',
              'localField': '_id.user',
              'foreignField': '_id',
              'as': '_id.user'
            }
          }, {
            '$unwind': '$_id.user'
          }, {
            '$project': {
              'post': '$_id',
              '_id': false,
              'commentCount': '$count'
            }
          }
        ]
      )
      .then(posts => res.send(posts))
      .catch(next);
  })

  .get('/:id', async(req, res, next) => {
    try {
      const post = await Post
        .findById(req.params.id)
        .populate('user', {
          _id: true,
          username: true,
          profilePhotoUrl: true
        })
        .lean();

      const comments = await Comment
        .find({ post: post._id })
        .populate('commentBy', {
          username: true,
        })
        .select({
          commentBy: true,
          comment: true
        })
        .lean();

      post.comments = comments;
      res.send(post);
    } catch(err) {
      next(err);
    }
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    const { caption } = req.body;
    Post
      .findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { caption }, { new: true })
      .populate('user', {
        _id: true,
        username: true,
        profilePhotoUrl: true
      })
      .lean()
      .then(post => {
        if(!post) {
          const error = new Error('Unauthorized Request');
          error.status = 401;
          return next(error);
        }
        else {
          res.send(post);
        }
      })
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .findOneAndDelete({ _id: req.params.id, user: req.user._id })
      .lean()
      .then(post => {
        if(!post) {
          const error = new Error('Unauthorized Request');
          error.status = 401;
          return next(error);
        }
        else {
          res.send(post);
        }
      })
      .catch(next);
  });
