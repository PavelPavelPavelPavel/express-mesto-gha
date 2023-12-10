const { celebrate, Joi } = require('celebrate');

const validateJwt = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().min(172).max(172),
  }).unknown(true),
});

module.exports = validateJwt;
