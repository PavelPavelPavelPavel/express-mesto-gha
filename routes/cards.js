const cardsRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateLikeCard } = require('../utils/validation/cardValidation');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', validateLikeCard, likeCard);
cardsRouter.delete('/:cardId/likes', validateLikeCard, dislikeCard);

module.exports = cardsRouter;
