const { Router } = require('express');
// const { tokenize } = require('../utils/token');
const Comment = require('../models/Comment');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      post,
      commentBy,
      comment
    } = req.body;
    Comment
      .create({ post, comment, commentBy })
      .then(comment => res.send(comment))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });
