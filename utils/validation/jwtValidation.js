const { celebrate, Joi } = require('celebrate');

const validateJwt = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports = validateJwt;
