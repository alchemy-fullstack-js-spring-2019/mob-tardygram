const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

// routes go here
// app.use();

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
