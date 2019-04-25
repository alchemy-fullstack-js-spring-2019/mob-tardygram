const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      comment,
      post
    } = req.body;

    Comment
      .create({ commentBy: req.user._id, comment, post })
      .then(createdComment => res.send(createdComment))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedComment => res.send(deletedComment))
      .catch(next);
  });
