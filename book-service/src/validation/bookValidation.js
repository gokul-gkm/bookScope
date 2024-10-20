const Joi = require('joi');

const bookValidation = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
});

module.exports = bookValidation;
