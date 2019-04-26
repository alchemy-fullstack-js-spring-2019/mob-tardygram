const { Router } = require('express');
const Thread = require('../models/Thread');
const Comment = require('../models/Comment');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      username,
      photoUrl,
      caption,
      hashtags
    } = req.body;

    Thread
      .create({ username, photoUrl, caption, hashtags })
      .then(thread => {
        res.send(thread);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Thread
      .find()
      .lean()
      .then(threadList => res.send(threadList))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Thread
      .findById(req.params.id)
      .select({
        __v: false
      })
      .populate('username', {
        username: true
      })
      .lean()
      .then(thread => {
        return Promise.all([
          Promise.resolve(thread),

          Comment
            .find({ thread: req.params.id })
            .populate('username', {
              username: true
            })
            .select({
              body: true,
              username: true
            })
        ]);
      })

      .then(([thread, comments]) => {
        res.send({ ...thread, comments });
      })
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Thread
      .findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
      .select({
        hashtags: false,
        _id: false,
        __v: false
      })
      .lean()
      .then(updatedThread => res.send(updatedThread))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Thread
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .then(deletedThread => res.send(deletedThread))
      .catch(next);
  });
