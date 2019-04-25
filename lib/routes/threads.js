const { Router } = require('express');
const Thread = require('../models/Thread');
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

// .get('/:id', (req,res,next) => {
//   Thread
//     WRITE AFTER COMPLETING COMMENT
// })

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
