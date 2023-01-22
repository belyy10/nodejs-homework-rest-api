const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(1).required(),
});

module.exports = {
  newContactSchema,
};
