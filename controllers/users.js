const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  NotFoundError,
  DataError,
  AlreadyExistsError,
  AuthError,
} = require('../errors');
const { SALT, KEY_FOR_TOKEN } = require('../utils/config');
const userModel = require('../models/user');

const createToken = (id) => jwt.sign({ _id: id }, KEY_FOR_TOKEN, {
  expiresIn: 3600000 * 24 * 7,
});

function getAllUsers(req, res, next) {
  return userModel
    .find()
    .then((users) => {
      if (!users) {
        return next(new NotFoundError('Пользователи не найдены'));
      }
      return res.status(200).send(users);
    })
    .catch(next);
}

function getUserById(req, res, next) {
  return userModel
    .findById(req.params.userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(err);
    });
}

function createUser(req, res, next) {
  const { email, password, ...userData } = req.body;

  if (!email || !password) {
    return next(new DataError('Поля имейл или пароль заполнены неверно'));
  }
  return bcrypt.hash(password, SALT)
    .then((hash) => userModel
      .create({ email, password: hash, ...userData })
      .then((user) => {
        // eslint-disable-next-line no-shadow
        const {
          // eslint-disable-next-line no-shadow
          name, email, avatar, about,
        } = user;
        return res
          .status(201)
          .send({
            name, about, avatar, email,
          });
      }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new AlreadyExistsError('Пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new DataError('Поля имейл или пароль заполнены неверно'));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new DataError('Поля имейл или пароль заполнены неверно'));
  }
  return userModel.findOne({ email }).select('+password')
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new AuthError('Нет доступа'));
      }
      // eslint-disable-next-line consistent-return
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return next(err);
        }
        if (isMatch) {
          return res.send({ token: createToken(user._id) });
        }
        return next(new AuthError('Нет доступа'));
      });
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  const userId = req.user._id;
  if (!userId) {
    return next(new NotFoundError('Пользователь не найден'));
  }
  return userModel.findById(userId)
    .then((user) => {
      const {
        _id, name, about, avatar, email,
      } = user;
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send({
        _id, name, about, avatar, email,
      });
    })
    .catch(next);
}

function updateInfo(req, res, next) {
  const userId = req.user._id;
  const { body } = req;

  return userModel
    .findByIdAndUpdate(
      userId,
      {
        $set: {
          ...body,
        },
      },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Введены некорректные данные'));
      }
      return next(err);
    });
}

function updateUserInfo(req, res, next) {
  return updateInfo(req, res, next);
}

function updateUserAvatar(req, res, next) {
  return updateInfo(req, res, next);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserInfo,
};
