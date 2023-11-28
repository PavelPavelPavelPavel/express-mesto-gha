/* eslint-disable consistent-return */
const cardModel = require('../models/card');
const {
  setDataNotFound,
  setServerError,
  setWrongData,
} = require('../errors/errors');

function getAllCards(req, res) {
  return cardModel
    .find()
    .then((cards) => res.send(cards))
    .catch((err) => setServerError(err));
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
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  return cardModel
    .findByIdAndDelete(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      setDataNotFound('Карточка не найдена', res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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
      { new: true },
    )
    .then((like) => {
      if (like) {
        return res.send(like);
      }
      setDataNotFound('Карточка не найдена', res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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
      { new: true },
    )
    .then((like) => {
      if (like) {
        return res.send(like);
      }
      setDataNotFound('Карточка не найдена', res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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
