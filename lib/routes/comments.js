const { Router } = require('express');
const Comment = require('../../lib/models/Comments');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { comment, post } = req.body;
    Comment
      .create({ comment, post, commentBy: req.user._id })
      .then(comment => res.send(comment))
      .catch(next);
  });
