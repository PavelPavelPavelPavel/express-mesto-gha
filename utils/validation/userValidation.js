const { celebrate, Joi } = require('celebrate');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(http(s?):\/\/)(w{3}\.)?([\w\d\W\D]*)(\w?)[#]?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/(http(s?):\/\/)(w{3}\.)?([\w\d\W\D]*)(\w?)[#]?/),
  }).unknown(true),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});

const validateIdUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^(\w){24}$/),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUserAvatar,
  validateUpdateUserInfo,
  validateIdUser,
};
