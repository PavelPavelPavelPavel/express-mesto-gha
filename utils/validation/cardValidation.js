const { celebrate, Joi } = require('celebrate');

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const validateIdCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(/^(\w){24}$/),
  }),
});

module.exports = {
  validateCreateCard,
  validateIdCard,
};
