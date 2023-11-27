const cardModel = require("../models/card");

function getAllCards(req, res) {
  return cardModel
    .find()
    .then((cards) => {
      console.log(cards);
      return res.status(200).send(cards);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
}

function createCard(req, res) {
  const cardData = req.body;
  const userId = req.user._id;

  return cardModel
    .create({
      name: cardData.name,
      link: cardData.link,
      owner: userId,
    })
    .then((card) => {
      if (card) {
        return res.status(201).send(card);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send(err.message);
      }
      return res.status(500).send("Server Error");
    });
}

function deleteCard(req, res) {
  const cardId = req.params.cardId;
  return cardModel
    .findByIdAndDelete(cardId)
    .then((card) => {
      if (card) {
        console.log("deleted from DB");
        return res.status(200).send(card);
      }
      console.log("Карточка с таким ID не найдена");
      return res.status(404).send("Карточка с таким ID не найдена");
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(err.name);
        return res.status(400).send("Неверный формат ID");
      }
      console.log(err.name);
      return res.status(500).send("Server Error");
    });
}

function likeCard(req, res) {}

function dislikeCard(req, res) {}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
