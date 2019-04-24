const mongoose = require('mongoose');
const { parse } = require('url');

const mongooseEvent = (event, dbURI) => {
  mongoose.connection.on(event, () => {
    console.log(`Connection to MONGODB ${event} at ${dbURI}`);
  });
};

const redact = dbURI => {
  const parsedDbURI = parse(dbURI);
  const authPart = parsedDbURI.auth ? '***:***@' : '';

  return `${parsedDbURI.protocol}//${authPart}${parsedDbURI.hostname}:${parsedDbURI.port}${parsedDbURI.pathname}`;
};

module.exports = (dbURI = process.env.MONGODB_URI) => {
  const redactedDbURI = redact(dbURI);
  ['open', 'error', 'disconnected', 'reconnected']
    .forEach(event => { mongooseEvent(event, redactedDbURI); });

  return mongoose.connect(dbURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  });
};

