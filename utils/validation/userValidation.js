const { celebrate, Joi } = require('celebrate');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
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

const validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }).unknown(true),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUserAvatar,
  validateUpdateUserInfo,
};
