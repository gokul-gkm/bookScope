require('dotenv').config();

module.exports = {
  port: process.env.PORT || 7000,
  jwtSecret: process.env.JWT_SECRET,
  userServiceUrl: process.env.USER_SERVICE_URL,
  bookServiceUrl: process.env.BOOK_SERVICE_URL,
  reviewServiceUrl: process.env.REVIEW_SERVICE_URL,
};
