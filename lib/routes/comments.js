const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log(req.body);
    const {
      comment,
      post
    } = req.body;

    Comment
      .create({ commentBy: req.user._id, comment, post })
      .then(createdComment => res.send(createdComment))
      .catch(next);
  });
