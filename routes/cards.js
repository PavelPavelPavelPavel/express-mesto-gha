const cardsRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const authUser = require('../middlewares/auth');
const validateJwt = require('../utils/validation/jwtValidation');
const { validateCreateCard } = require('../utils/validation/cardValidation');

cardsRouter.use(validateJwt, authUser);
cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
