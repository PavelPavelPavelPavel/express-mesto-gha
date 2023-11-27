const cardModel = require("../models/card");
const {
  setDataNotFound,
  setServerError,
  setWrongData,
} = require("../errors/errors");

function getAllCards(req, res) {
  return cardModel
    .find()
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch((err) => {
      return setServerError(err);
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
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

function deleteCard(req, res) {
  const cardId = req.params.cardId;
  return cardModel
    .findByIdAndDelete(cardId)
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return setDataNotFound("Карточка не найдена", (err = ""), res);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

function likeCard(req, res) {
  return cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: {
          likes: req.user._id,
        },
      },
      { new: true }
    )
    .then((like) => {
      if (like) {
        return res.status(201).send(like);
      }
      return setDataNotFound("Карточка не найдена", (err = ""), res);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

function dislikeCard(req, res) {
  return cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: {
          likes: req.user._id,
        },
      },
      { new: true }
    )
    .then((like) => {
      if (like) {
        return res.status(200).send(like);
      }
      return setDataNotFound("Карточка не найдена", (err = ""), res);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
