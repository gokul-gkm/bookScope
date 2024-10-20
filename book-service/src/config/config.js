require('dotenv').config();

module.exports = {
  port: process.env.PORT || 50052,
  mongoUri: process.env.MONGO_URI,
};