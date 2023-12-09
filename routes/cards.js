const cardsRouter = require('express').Router();
const cardController = require('../controllers/cards');
const authUser = require('../middlewares/auth');

cardsRouter.use(authUser);
cardsRouter.get('/', cardController.getAllCards);
cardsRouter.post('/', cardController.createCard);
cardsRouter.delete('/:cardId', cardController.deleteCard);
cardsRouter.put('/:cardId/likes', cardController.likeCard);
cardsRouter.delete('/:cardId/likes', cardController.dislikeCard);

module.exports = cardsRouter;
