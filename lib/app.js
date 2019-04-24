const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const { bearerToken } = require('./middleware/ensure-auth');


app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use(bearerToken);

app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));
app.use('/api/v1/posts', require('./routes/posts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
