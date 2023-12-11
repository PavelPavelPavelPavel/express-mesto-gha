const { celebrate, Joi } = require('celebrate');

const avatarValidation = /(http(s?):\/\/)(w{3}\.)?([\w\d\W\D]*)(\w?)[#]?/;
const idValidation = /^(\w){24}$/;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(avatarValidation),
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
    avatar: Joi.string().pattern(avatarValidation),
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
    userId: Joi.string().required().pattern(idValidation),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUserAvatar,
  validateUpdateUserInfo,
  validateIdUser,
  idValidation,
};
