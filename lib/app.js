const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const { bearerToken, ensureAuth } = require('../lib/middleware/ensureAuth');
const authRoutes = require('../lib/routes/auth');
const postRoutes = require('../lib/routes/posts');
const commentRoutes = require('../lib/routes/comments');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
app.use(bearerToken);

app.use('/api/v1/auth', mongoConnection, authRoutes);
app.use('/api/v1/posts', mongoConnection, postRoutes);
app.use('/api/v1/comments', mongoConnection, ensureAuth, commentRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
