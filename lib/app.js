const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const errorMiddleware = require('./middleware/error');
const notFoundMiddleware = require('./middleware/not-found');
const authRoutes = require('../lib/routes/auth');
const { bearerToken } = require('../lib/middleware/ensureAuth');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
app.use(bearerToken);
app.use('/api/v1/auth', mongoConnection, authRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
