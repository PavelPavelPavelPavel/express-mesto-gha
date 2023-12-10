const { celebrate, Joi } = require('celebrate');

const validateJwt = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().pattern(/^(\w{36}\.)(\w{91}\.)(\w{43})$/),
  }).unknown(true),
});

module.exports = validateJwt;
