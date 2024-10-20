require('dotenv').config();

module.exports = {
  port: process.env.PORT || 50053,
  mongoUri: process.env.MONGO_URI,
};