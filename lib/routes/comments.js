const { Router } = require('express');
const Comment = require('../models/Comment');
const { ensureAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, async(req, res, next) => {
    const {
      commentBy,
      post,
      comment
    } = req.body;

    if(req.user._id !== commentBy) {
      const error = new Error('POSER!!');
      error.status = 401;
      next(error);
    }

    try {
      const createdComment = await Comment
        .create({ commentBy, post, comment });
      res.send(createdComment);
    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', ensureAuth, async(req, res, next) => {
    const commentToBeDeleted = await Comment.findOne({ _id: req.params.id });
    
    if(req.user._id !== commentToBeDeleted.commentBy.toString()) {
      const error = new Error('POSER!!');
      error.status = 401;
      next(error);
    }

    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      res.send(deletedComment);
    } catch(error) {
      next(error);
    }
  });
