const Joi = require('joi');

const editReviewValidation = Joi.object({
    id: Joi.string().required(), 
    bookId: Joi.string().required(),
    userId: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
});

module.exports = editReviewValidation;