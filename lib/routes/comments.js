const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const { untokenize } = require('../utils/token');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      commentBy,
      post,
      comment
    } = req.body;
    const uId = untokenize(req.token)._id;

    if(commentBy.toString() !== uId){
      const error = new Error('You shall not comment on this post.');
      error.status = 401;
      return next(error); 
    }
    Comment
      .create({ commentBy, post, comment })
      .then(comment => res.send(comment))
      .catch(next);

  });
