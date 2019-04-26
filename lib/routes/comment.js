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
  .delete('/comments/:id', ensureAuth, (req, res, next) => {
    const { id } = req.params;  //comment id
   
    Comment
      .findById(id)
      .then(comment => {
        if(req.user._id !== comment.commentBy.toString()){
          const error = new Error('You didn\'t make this comment! No!');
          next(error);
        }
        else {
          Comment
            .findByIdAndDelete(id)
            .select({
              __v: false
            })
            .lean()
            .then(deletedComment => res.send(deletedComment))
            .catch(next);
        }
      });
      
  });
