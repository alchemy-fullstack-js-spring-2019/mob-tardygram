const { Router } = require('express');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { comment, post } = req.body;
    Comment
      .create({ comment, post, commentBy: req.user._id })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Comment
      .findOneAndDelete({
        commentBy: req.user._id,
        _id: req.params.id,
      })
      .then(deletedComment => {
        if(!deletedComment) {
          const error = new Error('Unauthorized Request');
          error.status = 401;
          return next(error);
        }
        else {
          res.send(deletedComment);
        }
      });
  });
