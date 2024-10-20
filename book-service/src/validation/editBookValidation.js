const Joi = require('joi');

const editBookValidation = Joi.object({
  id: Joi.string().required(), 
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
});

module.exports = editBookValidation;
