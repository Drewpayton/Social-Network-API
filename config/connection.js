const { connect, connection } = require('mongoose');
require('dotenv').config()
const username = process.env.NAME
const password = process.env.PASS

const connectionString = `mongodb+srv://${username}:${password}@cluster0.pg2foxl.mongodb.net/test`;

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;