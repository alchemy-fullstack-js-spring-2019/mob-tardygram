const { Router } = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/posts', ensureAuth, (req, res, next) => {
    const user = req.body.user;
    const photoUrl = req.body.photoUrl;
    const caption = req.body.caption;
    const tags = req.body.tags;
  
    Post
      .create({ user, photoUrl, caption, tags })
      .then(createdPost => {
        res.send(createdPost);
      })
      .catch(next);
  })
  .get('/posts', (req, res, next) => {
    Post
      .find()
      .lean()
      .select({ __v: false })
      .then(allPosts => res.send(allPosts))
      .catch(next);
  })
  .get('/posts/:id', (req, res, next) => {
    const { id } = req.params;
    Post
      .findById(id)
      .lean()
      .select({ __v: false })
      .then(newPost => res.send(newPost))
      .catch(next);
  })
  .patch('/posts/:id', ensureAuth, (req, res, next) => {
    const { id } = req.params;
    const caption = req.body.caption;
    
    Post  
      .findByIdAndUpdate(id, { caption }, { new: true })
      .lean()
      .select({
        __v: false
      })
      .then(updatedPost => res.send(updatedPost))
      .catch(next);
  });


