require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app.js');

const PORT = process.env.PORT || 3355;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

