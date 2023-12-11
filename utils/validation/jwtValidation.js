const { celebrate, Joi } = require('celebrate');

const jwtValidation = /^(\w{36}\.)(\w{91}\.)(\w{43})$/;

const validateJwt = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().pattern(jwtValidation),
  }).unknown(true),
});

module.exports = validateJwt;
