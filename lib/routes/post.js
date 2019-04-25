const { Router } = require('express');
const Post = require('../../lib/models/Post');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user, photoUrl, caption, tags,
    } = req.body;
    Post 
      .create({ user, photoUrl, caption, tags })
      .then(gram => res.send(gram))
      .catch(next);

  });
