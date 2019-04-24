const express = require('express');
const mongoConnection = require('./middleware/mongo-connection');
const { bearerToken } = require('./middleware/ensureAuth');

const app = express();


app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

//ROUTES
app.use(bearerToken);
app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
