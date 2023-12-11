const { celebrate, Joi } = require('celebrate');

const { idValidation } = require('./userValidation');

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const validateIdCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(idValidation),
  }),
});

module.exports = {
  validateCreateCard,
  validateIdCard,
};
