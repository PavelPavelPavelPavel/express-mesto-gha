const { celebrate, Joi } = require('celebrate');

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

module.exports = {
  validateCreateCard,
};
