const { Router } = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { ensureAuth } = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, async(req, res, next) => {
    const { user, photoUrl, caption, hashtags } = req.body;
    const authUser = req.user;

    if(authUser._id !== user){
      const error = new Error('Dont be a JERKK!, you poser');
      error.status = 401;
      next(error);
    }
    
    try {
      const post = await Post.create({ user, photoUrl, caption, hashtags });
      res.send(post);
    } catch(error) {
      next(error);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const posts = await Post
        .find();
      res.send(posts);
    }
    catch(error) {
      next(error);
    }
  })
  .get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try { 
      const post = await Post
        .findById(id)
        .lean()
        .populate('user', {
          username: true,
          profilePhotoUrl: true
        });
      const comments = await Comment  
        .find({ post: id });
      post.comments = comments;
      
      res.send(post);
    }
    catch(error) {
      next(error);
    } 
  })
  .patch('/:id', ensureAuth, async(req, res, next) => {

    const postToUpdate = await Post.findOne({ _id: req.params.id });

    if(req.user._id !== postToUpdate.user.toString()) {
      const error = new Error('POSER!!');
      error.status = 401;
      next(error);
    }

    const { caption } = req.body;
    const { id } = req.params;
    try {
      const post = await Post
        .findByIdAndUpdate(id, { caption }, { new: true });
      res.send(post);
    }
    catch(error) {
      next(error);
    }
  });

