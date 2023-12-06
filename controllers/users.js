const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  setServerError,
  setWrongData,
  setDataNotFound,
  // setWrongEmailOfPassError,
} = require('../errors/errors');
const { SALT, KEY_FOR_TOKEN } = require('../utils/config');
const userModel = require('../models/user');

const createToken = (id) => {
  return jwt.sign({ _id: id }, KEY_FOR_TOKEN, {
    expiresIn: 3600000 * 24 * 7
  });
};

function getAllUsers(req, res) {
  return userModel
    .find({})
    .then((users) => res.send(users))
    .catch((err) => setServerError(err, res));
}

function getUserById(req, res) {
  return userModel
    .findById(`${req.params.userId}`)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      setDataNotFound('Пользователь не найден', res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

function createUser(req, res) {
  const { email, password, ...userData } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }
  return bcrypt.hash(password, SALT)
    .then((hash) =>
      userModel
        .create({ email, password: hash, ...userData })
        .then((user) => {
          // eslint-disable-next-line no-shadow
          const { name, email, password } = user;
          return res
            .status(201)
            .send({ name, email });
        }))
    .catch((err) => {
      if (err.name === "MongoServerError") {
        return res.status(401).send({ message: "User already rigistered" })
      }
      if (err.name === 'ValidationError') {
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

function updateInfo(req, res) {
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
      if (user) {
        return res.send(user);
      }
      return setDataNotFound('Пользователь не найден', res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return setWrongData(err, res);
      }
      return setServerError(err, res);
    });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }
  return userModel.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Неверный имейл или пароль' })
      }
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) {
          throw err;
        }
        if (!isMatch) {
          return res.status(401).send({ message: 'Неверный имейл или пароль' })
        }
        return res.send({ token: createToken(user._id) })
      }
      )
    })
    .catch(err => {
      return setServerError(err, res);
    })
}

function getUserInfo(req, res) {
  const userId = req.user._id;
  if (!userId) {
    return setDataNotFound('Пользователь не найден', res);
  }
  return userModel.findById(userId)
    .then(user => {
      if (!user) {
        return setDataNotFound('Пользователь не найден', res);
      }
      const { name, about, avatar, email } = user;
      return res.send({ name, about, avatar, email })
    })
    .catch(err => {
      return setServerError(err, res);
    })
}

function updateUserInfo(req, res) {
  return updateInfo(req, res);
}

function updateUserAvatar(req, res) {
  return updateInfo(req, res);
}




module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserInfo
};
