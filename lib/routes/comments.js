const { Router } = require('express');
const Comment = require('../models/Comment');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      username,
      thread,
      body
    } = req.body;
    Comment
      .create({ username, thread, body })
      .then(comment => {
        res.send(comment);
      })
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .then(deletedComment => res.send(deletedComment))
      .catch(next);
  });
