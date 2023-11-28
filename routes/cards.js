const cardsRouter = require("express").Router();

const cardController = require("../controllers/cards");



cardsRouter.get("/", cardController.getAllCards);

cardsRouter.post("/", cardController.createCard);

cardsRouter.delete("/:cardId", cardController.deleteCard);

cardsRouter.put("/:cardId/likes", cardController.likeCard);

cardsRouter.delete("/:cardId/likes", cardController.dislikeCard);



module.exports = cardsRouter;

