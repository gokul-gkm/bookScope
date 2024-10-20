const Joi = require('joi');

const reviewValidation = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
});

module.exports = reviewValidation;