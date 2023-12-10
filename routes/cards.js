const cardsRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateIdCard } = require('../utils/validation/cardValidation');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.delete('/:cardId', validateIdCard, deleteCard);
cardsRouter.put('/:cardId/likes', validateIdCard, likeCard);
cardsRouter.delete('/:cardId/likes', validateIdCard, dislikeCard);

module.exports = cardsRouter;
