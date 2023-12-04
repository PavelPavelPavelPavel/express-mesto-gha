const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  setServerError,
  setWrongData,
  setDataNotFound,
  // setWrongEmailOfPassError,
} = require('../errors/errors');
const userModel = require('../models/user');

const SALT = 10;
const KEY_FOR_TOKEN = 'abrakadabra123';
const createToken = (id) => {
  return jwt.sign({_id: id}, KEY_FOR_TOKEN);
};

function getAllUsers(req, res) {
  return userModel
    .find({})
    .then((users) => res.send(users))
    .catch((err) => setServerError(err, res));
}

function getUser(req, res) {
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
    .then((hash) => userModel
      .create({ email, password: hash, ...userData })
      .then((user) => {
        // eslint-disable-next-line no-shadow
        const { name, email } = user;
        return res
          .status(201)
          .send({ name, email });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return setWrongData(err, res);
      }
      // if (err.name === 'MongoServerError' && err.code === 'E11000') {
      //   return setWrongEmailOfPassError(err, res);
      // }
      console.log(err.name);
      console.log(err.message);
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

function login (req, res) {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }
 return userModel.findOne({email})
 .then(user => {
    if(!user) {
      return res.status(404).send({message: 'Неверный имейл или пароль'})
    }
    return bcrypt.compare(password, user.password, function(err, isMatch) {
      if(err) {
        throw err;
      }
      if(!isMatch) {
        return res.status(404).send({message: 'Неверный имейл или пароль'})
      }
     return res.cookie('token', {token: createToken(user._id)}, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .end();
     }
    )
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
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login
};
