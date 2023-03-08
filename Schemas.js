const Joi = require("joi");

module.exports.BlogSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string(),
});
module.exports.CommentSchema = Joi.object({
  body: Joi.string().required(),
});
