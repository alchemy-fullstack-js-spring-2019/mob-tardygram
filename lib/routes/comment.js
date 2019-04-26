const { Router } = require('express');
const Comment = require('../models/Comment');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/comments', ensureAuth, (req, res, next) => {
    const {
      commentBy,
      post,
      comment
    } = req.body;
    Comment
      .create({
        commentBy,
        post,
        comment
      })
      .then(createdComment => res.send(createdComment))
      .catch(next);
  })
  .delete('/comments/:id', (req, res, next) => {
    const { id } = req.params;

    Comment
      .findByIdAndDelete(id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedComment => res.send(deletedComment))
      .catch(next);
  });
