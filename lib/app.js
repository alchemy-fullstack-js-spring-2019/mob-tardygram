const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const { bearerToken } = require('./middleware/ensureAuth');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use(bearerToken);

// write correct route name
app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));
app.use('/api/v1', mongoConnection, require('./routes/comment'));
app.use('/api/v1', mongoConnection, require('./routes/post'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
