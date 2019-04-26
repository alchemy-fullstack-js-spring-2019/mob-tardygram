require('dotenv').config();
const mongoose = require('mongoose');
require('../../lib/utils/connect')();
require('./seed-data')()
  .then(() => {
    return mongoose.connection.close();
  });
