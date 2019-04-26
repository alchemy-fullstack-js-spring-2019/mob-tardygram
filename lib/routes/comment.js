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
  });
